import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from './image.dto';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePortfolioDto {
    @ApiProperty({ description: 'Portfolio name' })
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: string;
}

export class PortfolioDto {
    @ApiProperty({ example: 1, description: 'Portfolio ID' })
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty({ required: false })
    description?: string;
    @ApiProperty({ description: 'Owner Profile ID' })
    userId: number;
    @ApiProperty() // Lazy load type if ImageDto is defined later
    images?: ImageDto[];
    @ApiProperty({ example: '2023-10-27T10:00:00.000Z' })
    createdAt: Date;
}

export class UpdatePortfolioDto {
    @ApiProperty({ required: false })
    name?: string;
    @ApiProperty({ required: false })
    description?: string;
}
