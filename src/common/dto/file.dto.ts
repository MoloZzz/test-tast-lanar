import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
    @ApiProperty() id: number;
    @ApiProperty() imageId: number;
    @ApiProperty() filename: string;
    @ApiProperty() mimetype: string;
    @ApiProperty() size: number;
    @ApiProperty() path: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
}
