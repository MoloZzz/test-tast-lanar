import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto, CommentDto, UpdateCommentDto, UUIDParamDto, PaginationQueryDto } from 'src/common/dto';
import { Request } from 'express';
import { CommentModel } from 'src/common/sequelize/models/comment.model';

@ApiTags('Comment CRUD API')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('image/:id')
    @ApiOperation({ summary: 'Get all comments for a specific image' })
    async getComments(@Param() params: UUIDParamDto, @Query() pagination: PaginationQueryDto): Promise<CommentModel[]> {
        const { limit, offset } = pagination;
        return this.commentService.getCommentsByImageId(params.id, limit, offset);
    }

    @Post('image/:id')
    @ApiOperation({ summary: 'Add a comment to an image' })
    async addComment(
        @Req() req: Request,
        @Param() params: UUIDParamDto,
        @Body() createCommentDto: CreateCommentDto,
    ): Promise<CommentModel> {
        const profileId = 'asdasdsadsasa'; // req.profile.profileId;
        return this.commentService.create(profileId, params.id, createCommentDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a specific comment' })
    async updateComment(
        @Req() req: Request,
        @Param() params: UUIDParamDto,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<CommentModel> {
        return this.commentService.update(params.id, updateCommentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific comment' })
    async deleteComment(@Req() req: Request, @Param() params: UUIDParamDto): Promise<void> {
        return this.commentService.delete(params.id);
    }
}
