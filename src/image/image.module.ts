import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageModel } from 'src/common/sequelize/models/image.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from 'src/file/file.module';

@Module({
    imports: [SequelizeModule.forFeature([ImageModel]), FileModule],
    providers: [ImageService],
    controllers: [ImageController],
})
export class ImageModule {}
