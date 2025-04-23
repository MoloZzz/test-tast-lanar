import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePortfolioDto } from 'src/common/dto';
import { PortfolioModel } from 'src/common/sequelize/models/portfolio.model';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel(PortfolioModel)
        private readonly portfolioModel: typeof PortfolioModel,
    ) {}

    async create(id: string, data: CreatePortfolioDto) {
        return await this.portfolioModel.create({
            ...data,
            profileId: id,
        });
    }

    async delete(profileId: string, portfolioId: string) {
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
        return { message: `Portfolio ${portfolioId} deleted successfully` };
    }
}
