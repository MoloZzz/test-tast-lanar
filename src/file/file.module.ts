import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModel } from 'src/common/sequelize/models/file.model';

@Module({
    imports: [SequelizeModule.forFeature([FileModel])],
    providers: [FileService],
    controllers: [FileController],
    exports: [FileService],
})
export class FileModule {}
