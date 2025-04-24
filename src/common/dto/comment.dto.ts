import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    content: string;
}

export class CommentDto {
    @ApiProperty({ description: 'UUID' })
    id: string;
    @ApiProperty()
    content: string;
    @ApiProperty({ example: 10, description: 'Image ID this comment belongs to' })
    imageId: number;
    @ApiProperty({ example: 5, description: 'Author User ID' })
    profileId: number;
    @ApiProperty({ example: '2023-10-27T10:10:00.000Z' })
    createdAt: Date;
}

export class UpdateCommentDto {
    @ApiProperty({ description: 'Updated comment text' })
    content?: string;
}
