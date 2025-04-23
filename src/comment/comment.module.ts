import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentModel } from 'src/common/sequelize/models/comment.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([CommentModel])],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}
