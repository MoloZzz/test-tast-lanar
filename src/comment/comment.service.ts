import { Injectable } from '@nestjs/common';
import { CommentDto, CreateCommentDto, UpdateCommentDto } from 'src/common/dto';

@Injectable()
export class CommentService {
    constructor() {}

    async create(profileId: any, imageId: number, createCommentDto: CreateCommentDto): Promise<CommentDto> {
        console.log('Add Comment to Image ID:', imageId, 'DTO:', createCommentDto);
        return {} as CommentDto; // Placeholder
    }

    async getImagesByImageId(imageId: number, limit?: number, offset?: number): Promise<CommentDto[]> {
        console.log('Fetching comments for imageId:', imageId);
        return [];
    }

    async update(commentId: number, updateCommentDto: UpdateCommentDto): Promise<CommentDto> {
        console.log('Update Comment ID:', commentId, 'DTO:', updateCommentDto);
        return {} as CommentDto; 
    }

    async delete(commentId: number): Promise<void> {
        console.log('Delete Comment ID:', commentId);
    }
}
