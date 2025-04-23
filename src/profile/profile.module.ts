import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileModel } from 'src/common/sequelize/models/profile.model';

@Module({
    imports: [SequelizeModule.forFeature([ProfileModel])],
    providers: [ProfileService],
    controllers: [ProfileController],
})
export class ProfileModule {}
