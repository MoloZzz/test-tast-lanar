import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
    @ApiProperty({ type: 'string', format: 'binary' }) file: any;
    @ApiProperty({ required: false }) name?: string;
    @ApiProperty({ required: false }) description?: string;
}

export class ImageDto {
    @ApiProperty() id: number;
    @ApiProperty() portfolioId: number;
    @ApiProperty() name: string;
    @ApiProperty({ required: false }) description?: string;
    @ApiProperty() filePath: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
    // @ApiProperty({ type: () => [CommentDto], required: false }) comments?: CommentDto[];
}

export class ImageFeedDto {
    @ApiProperty() imageId: number;
    @ApiProperty({ required: false }) imageDescription?: string;
    @ApiProperty() portfolioName: string; // name from table portfolios (JOIN)
    @ApiProperty() filePath: string; // path from files (JOIN)
    @ApiProperty() imageCreatedAt: Date;
}

export class UpdateImageDto {
    @ApiProperty({ required: false }) name?: string;
    @ApiProperty({ required: false }) description?: string;
}
