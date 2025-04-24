import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePortfolioDto } from 'src/common/dto';
import { CommentModel } from 'src/common/sequelize/models/comment.model';
import { FileModel } from 'src/common/sequelize/models/file.model';
import { ImageModel } from 'src/common/sequelize/models/image.model';
import { PortfolioModel } from 'src/common/sequelize/models/portfolio.model';
import { ProfileModel } from 'src/common/sequelize/models/profile.model';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel(PortfolioModel)
        private readonly portfolioModel: typeof PortfolioModel,
    ) {}

    async getPortfoliosByProfileId(profileId: string): Promise<PortfolioModel[]> {
        return await this.portfolioModel.findAll({
            where: { profileId },
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: ProfileModel, 
                    attributes: ['id', 'username'],
                },
                {
                    model: ImageModel, 
                    attributes: ['id', 'name', 'description'],
                    include: [
                         { model: FileModel, attributes: ['id', 'path', 'originalname', 'mimetype', 'size'] }, 
                         { model: CommentModel, attributes: ['id','content', 'profileId']}, 
                    ],
                },
            ],
             order: [['createdAt', 'DESC']],
        });
    }

    async getPortfolioById(id: string) : Promise<PortfolioModel>{
        return await this.portfolioModel.findOne({
            where: { id },
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: ProfileModel, 
                    attributes: ['id', 'username'],
                },
                {
                    model: ImageModel, 
                    attributes: ['id', 'name', 'description'],
                    include: [
                         { model: FileModel, attributes: ['id', 'path', 'originalname', 'mimetype', 'size'] }, 
                         { model: CommentModel, attributes: ['id','content', 'profileId']}, 
                    ],
                },
            ],
             order: [['createdAt', 'DESC']],
        });
    }

    async create(id: string, data: CreatePortfolioDto) : Promise<PortfolioModel> {
        return await this.portfolioModel.create({
            ...data,
            profileId: id,
        });
    }

    async delete(profileId: string, portfolioId: string): Promise<void> {
        const portfolio = await this.portfolioModel.findOne({
            where: {
                id: portfolioId,
            },
        });

        if (!portfolio) {
            throw new NotFoundException('Portfolio not found');
        }
        if (portfolio.profileId !== profileId) {
            throw new BadRequestException('You have no permission to delete this portfolio');
        }

        await portfolio.destroy();
    }

    async isAuthor(profileId: string, portfolioId: string): Promise<boolean> {
        const portfolio = await this.portfolioModel.findOne({
            where: {
                id: portfolioId,
            },
        });

        if (!portfolio) {
            throw new NotFoundException('Portfolio not found');
        }

        if (portfolio.profileId !== profileId) {
            return false;
        }
        return true;
    }
}
