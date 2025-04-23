import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UUIDParamDto {
    @ApiProperty()
    @IsDefined()
    @Type(() => String)
    @IsUUID()
    id: string;
}

export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number;
}
