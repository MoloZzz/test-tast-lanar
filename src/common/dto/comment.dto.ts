import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({ example: 'Wow, amazing shot!', description: 'Comment text' })
    text: string;
}

export class CommentDto {
    @ApiProperty({ example: 101, description: 'Comment ID' })
    id: number;
    @ApiProperty({ example: 'Wow, amazing shot!', description: 'Comment text' })
    text: string;
    @ApiProperty({ example: 10, description: 'Image ID this comment belongs to' })
    imageId: number;
    @ApiProperty({ example: 5, description: 'Author User ID' })
    userId: number;
    @ApiProperty({ example: '2023-10-27T10:10:00.000Z' })
    createdAt: Date;
}

export class UpdateCommentDto {
    @ApiProperty({ description: 'Updated comment text' })
    text?: string;
}
