import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePortfolioDto } from 'src/common/dto';
import { basePortfolioFindOptions } from 'src/common/find-options/portfolio-base';
import { PortfolioModel } from 'src/common/sequelize/models/portfolio.model';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel(PortfolioModel)
        private readonly portfolioModel: typeof PortfolioModel,
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
