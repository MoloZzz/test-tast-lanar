import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto, CommentDto, UpdateCommentDto } from 'src/common/dto';
import { IProfile } from 'src/common/interface/profile.interface';
import { CommentModel } from 'src/common/sequelize/models/comment.model';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(CommentModel)
        private readonly commentModel: typeof CommentModel,
    ) {}

    async create(profile: IProfile, imageId: string, createCommentDto: CreateCommentDto): Promise<CommentModel> {
        const comment: CommentModel = await this.commentModel.create({
            content: createCommentDto.content,
            username: profile.username,
            imageId,
            profileId: profile.id,
        });

        return comment;
    }

    async getCommentsByImageId(imageId: string, limit?: number, offset?: number): Promise<CommentModel[]> {
        const comments: CommentModel[] = await this.commentModel.findAll({
            where: { imageId },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        return comments;
    }

    //TODO: add isAuthor checker
    async update(commentId: string, updateCommentDto: UpdateCommentDto, profileId: string): Promise<CommentModel> {
        const comment = await this.commentModel.findByPk(commentId);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        await comment.update(updateCommentDto);
        return comment;
    }

    //TODO: add isAuthor checker
    async delete(commentId: string, profileId: string): Promise<void> {
        const comment = await this.commentModel.findByPk(commentId);
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        await comment.destroy();
    }
}
