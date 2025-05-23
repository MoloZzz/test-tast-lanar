import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto, UUIDParamDto, PaginationQueryDto } from 'src/common/dto';
import { Request } from 'express';
import { CommentModel } from 'src/common/sequelize/models/comment.model';
import { IProfile } from 'src/common/interface/profile.interface';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async addComment(
        @Req() req: Request,
        @Param() params: UUIDParamDto,
        @Body() createCommentDto: CreateCommentDto,
    ): Promise<CommentModel> {
        const profile: IProfile = req.user as IProfile;
        return this.commentService.create(profile, params.id, createCommentDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a specific comment' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updateComment(
        @Req() req: Request,
        @Param() params: UUIDParamDto,
        @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<CommentModel> {
        const profile: IProfile = req.user as IProfile;
        return this.commentService.update(params.id, updateCommentDto, profile.id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a specific comment' })
    async deleteComment(@Req() req: Request, @Param() params: UUIDParamDto): Promise<void> {
        const profile: IProfile = req.user as IProfile;
        return this.commentService.delete(params.id, profile.id);
    }
}
