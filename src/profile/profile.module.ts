import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileModel } from 'src/common/sequelize/models/profile.model';
import { AuthModule } from 'src/auth/auth.module';
import { PortfolioModule } from 'src/portfolio/portfolio.module';

@Module({
    imports: [SequelizeModule.forFeature([ProfileModel]), PortfolioModule, AuthModule],
    providers: [ProfileService],
    controllers: [ProfileController],
    exports: [ProfileService],
})
export class ProfileModule {}
