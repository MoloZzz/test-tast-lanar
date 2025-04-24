import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePortfolioDto } from 'src/common/dto';
import { basePortfolioFindOptions } from 'src/common/find-options/portfolio-base';
import { PortfolioModel } from 'src/common/sequelize/models/portfolio.model';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel(PortfolioModel)
        private readonly portfolioModel: typeof PortfolioModel,
        @Inject(ImageService)
        private readonly imageService: ImageService,
    ) {}

    async getPortfoliosByProfileId(profileId: string): Promise<PortfolioModel[]> {
        return await this.portfolioModel.findAll({
            where: { profileId },
            ...basePortfolioFindOptions,
        });
    }

    async getPortfolioById(id: string): Promise<PortfolioModel> {
        return await this.portfolioModel.findOne({
            where: { id },
            ...basePortfolioFindOptions,
        });
    }

    async create(id: string, data: CreatePortfolioDto): Promise<PortfolioModel> {
        return await this.portfolioModel.create({
            ...data,
            profileId: id,
        });
    }

    async delete(profileId: string, portfolioId: string): Promise<void> {
        await this.imageService.deleteImagesByPortfolioId(portfolioId, profileId);
        // We already checked permissions in the imageService method
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

    async deleteByProfileId(profileId: string): Promise<void> {
        const portfoliosToDelete = await this.portfolioModel.findAll({
            where: { profileId },
            attributes: ['id'],
        });
        if (portfoliosToDelete.length === 0) {
            console.log(`Profile ${profileId} have no portfolios to delete`);
            return;
        }
        const imageDeletionPromises = portfoliosToDelete.map((portfolio) =>
            this.imageService.deleteImagesByPortfolioId(portfolio.id, profileId),
        );
        await Promise.all(imageDeletionPromises);

        const deletedCount = await this.portfolioModel.destroy({
            where: { profileId: profileId },
        });

        console.log(`Deleted ${deletedCount} portfolios for ${profileId}`);
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
