import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateImageDto {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    description: string;
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsUUID()
    portfolioId: string;
}

export class CreateImageMultipartDto {
    @ApiProperty({ type: 'string', format: 'binary', description: 'Файл зображення для завантаження' })
    file: any;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    portfolioId: string;
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
