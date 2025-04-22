import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto, CommentDto, UpdateCommentDto } from 'src/common/dto';
import { Request } from 'express';

@ApiTags('Comment CRUD API')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('images/:imageId/comments')
    @ApiOperation({ summary: 'Add a comment to an image' })
    async addComment(
        @Req() req: Request,
        @Param('imageId', ParseIntPipe) imageId: number,
        @Body() createCommentDto: CreateCommentDto,
    ): Promise<CommentDto> {
        // TODO: Implement logic in CommentService, use profileId from req.user
        // const profileId = req.user.profileId;
        // return this.commentService.create(profileId, imageId, createCommentDto);
        console.log('Add Comment to Image ID:', imageId, 'DTO:', createCommentDto);
        return {} as CommentDto; // Placeholder
    }

    @Get('images/:imageId/comments')
    @ApiOperation({ summary: 'Get all comments for a specific image' })
    async getComments(
        @Param('imageId', ParseIntPipe) imageId: number,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
        @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
    ): Promise<CommentDto[]> {
        // TODO: Implement logic in CommentService
        console.log('Get Comments for Image ID:', imageId, 'Query:', {
            limit,
            offset,
        });
        return []; // Placeholder
    }

    @Patch('comments/:commentId')
    @ApiOperation({ summary: 'Update a specific comment' })
    async updateComment(
        @Req() req: Request,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<CommentDto> {
        // TODO: Implement logic in CommentService, check ownership (comment.profileId === req.user.profileId)
        console.log('Update Comment ID:', commentId, 'DTO:', updateCommentDto);
        return {} as CommentDto; // Placeholder
    }

    @Delete('comments/:commentId')
    @ApiOperation({ summary: 'Delete a specific comment' })
    async deleteComment(@Req() req: Request, @Param('commentId', ParseIntPipe) commentId: number): Promise<void> {
        // TODO: Implement logic in CommentService, check ownership
        console.log('Delete Comment ID:', commentId);
    }
}
