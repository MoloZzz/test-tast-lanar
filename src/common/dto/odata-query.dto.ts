import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsNumber, IsOptional, IsString } from 'class-validator';

export class OdataQueryDto {
    @ApiPropertyOptional({
        description: 'Odata filter query string',
        example: `(contains(tolower(field), 'value'))`,
    })
    @IsOptional()
    @IsString()
    '$filter': string;

    @ApiPropertyOptional({ description: 'Use count status', example: true, default: false })
    @IsOptional()
    @IsBooleanString()
    '$count': 'true' | 'false' = 'false';

    @ApiPropertyOptional({ description: 'Retrieved records amount', example: 10 })
    @IsOptional()
    @IsNumber()
    '$top': number;

    @ApiPropertyOptional({ description: 'Skipped records amount', example: 0 })
    @IsOptional()
    @IsNumber()
    '$skip': number;

    @ApiPropertyOptional({ description: 'Odata sorting', example: 'field asc/desc' })
    @IsOptional()
    @IsString()
    '$orderby': string;
}