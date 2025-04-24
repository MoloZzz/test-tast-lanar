import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { CreateImageDto } from 'src/common/dto';
import { baseImageFindOptions } from 'src/common/find-options/image-base';
import { CommentModel } from 'src/common/sequelize/models/comment.model';
import { FileModel } from 'src/common/sequelize/models/file.model';
import { ImageModel } from 'src/common/sequelize/models/image.model';
import { PortfolioModel } from 'src/common/sequelize/models/portfolio.model';
import { FileService } from 'src/file/file.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel(ImageModel)
        private readonly imageModel: typeof ImageModel,
        @Inject(FileService)
        private readonly fileService: FileService,
        @Inject(forwardRef(() => PortfolioService))
        private readonly portfolioService: PortfolioService,
    ) {}

    async getAllImagesByOdata(query: any): Promise<ImageModel[]> {
        const findOptions: FindOptions = {
            where: {},
            order: [['createdAt', 'DESC']],
            ...baseImageFindOptions,
        };

        if (query.$top !== undefined) {
            const top = parseInt(query.$top, 10);
            if (!isNaN(top) && top >= 0) {
                findOptions.limit = top;
            } else {
                throw new BadRequestException('$top should be a non-negative number');
            }
        }
        if (query.$skip !== undefined) {
            const skip = parseInt(query.$skip, 10);
            if (!isNaN(skip) && skip >= 0) {
                findOptions.offset = skip;
            } else {
                throw new BadRequestException('$skip should be a non-negative number');
            }
        }
        if (query.$orderby) {
            const orderParts = query.$orderby.split(' ');
            if (orderParts.length === 2) {
                const field = orderParts[0];
                const direction = orderParts[1].toUpperCase() as 'ASC' | 'DESC';
                if (['ASC', 'DESC'].includes(direction)) {
                    findOptions.order = [[field, direction]];
                } else {
                    throw new BadRequestException('Wrong $orderby. Possible variants: asc, desc.');
                }
            } else {
                throw new BadRequestException('Wrong format $orderby. Use "field direction" (for example, "name asc").');
            }
        }
        const images = await this.imageModel.findAll(findOptions);
        return images;
    }

    async getByPortfolioId(portfolioId: string): Promise<ImageModel[]> {
        const images = await this.imageModel.findAll({
            where: {
                portfolioId: portfolioId,
            },
            order: [['createdAt', 'DESC']],
            ...baseImageFindOptions,
        });

        return images;
    }

    async getById(id: string): Promise<ImageModel | null> {
        const image = await this.imageModel.findByPk(id, {
            include: [FileModel, PortfolioModel, CommentModel],
        });
        return image;
    }

    async create(file: any | Express.Multer.File, data: CreateImageDto, profileId: string): Promise<ImageModel> {
        const isAuthor = await this.portfolioService.isAuthor(profileId, data.portfolioId);
        if (!isAuthor) {
            throw new BadRequestException('You are not allowed to create image for this portfolio');
        }
        const savedFile: FileModel = await this.fileService.saveFile(file);
        const newImage = await this.imageModel.create({ ...data, fileId: savedFile.id });
        return newImage;
    }

    async delete(imageId: string, profileId: string): Promise<void> {
        const image: ImageModel = await this.imageModel.findByPk(imageId, {
            attributes: ['id', 'fileId', 'portfolioId'],
            include: [
                {
                    model: PortfolioModel,
                    attributes: ['profileId'],
                    required: true,
                },
            ],
        });
        if (!image) {
            throw new NotFoundException('Image not found');
        }
        if (image.portfolio.profileId !== profileId) {
            throw new BadRequestException('You are not allowed to delete this image');
        }
        if (image.fileId) {
            await this.fileService.deleteFile(image.fileId);
        }
        await image.destroy();
    }

    async deleteImagesByPortfolioId(portfolioId: string, profileId: string): Promise<void> {
        const checkAuthor: boolean = await this.portfolioService.isAuthor(profileId, portfolioId);
        if (!checkAuthor) {
            throw new BadRequestException('You are not allowed to delete images for this portfolio');
        }
        const imagesToDelete = await this.imageModel.findAll({
            where: { portfolioId: portfolioId },
            attributes: ['id', 'fileId'],
        });

        const fileDeletionPromises = imagesToDelete
            .filter((image) => image.fileId)
            .map((image) => this.fileService.deleteFile(image.fileId));

        await Promise.allSettled(fileDeletionPromises);

        const deletedCount = await this.imageModel.destroy({
            where: { portfolioId: portfolioId },
        });

        console.log(`Deleted ${deletedCount} imgs for portfolio ${portfolioId}`);
        //Commnets deleting automatically by cascade
    }
}
