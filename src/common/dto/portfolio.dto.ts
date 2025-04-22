import { ApiProperty } from '@nestjs/swagger';
import { ImageDto } from './image.dto';

export class CreatePortfolioDto {
    @ApiProperty({ description: 'Portfolio name' })
    name: string;
    @ApiProperty({ required: false })
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
