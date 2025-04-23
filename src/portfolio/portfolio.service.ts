import { Injectable } from '@nestjs/common';
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
}
