import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioModel } from 'src/common/sequelize/models/portfolio.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageModule } from 'src/image/image.module';

@Module({
    imports: [SequelizeModule.forFeature([PortfolioModel]), ImageModule],
    providers: [PortfolioService],
    controllers: [PortfolioController],
    exports: [PortfolioService],
})
export class PortfolioModule {}
