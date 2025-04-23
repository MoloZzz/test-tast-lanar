import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

export class ProfileDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    username: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Exclude()
    password: string;
}

export class CreateProfileDto {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({ example: 'username', description: 'Username' })
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
}

export class UpdateProfileDto {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username: string;
}

export class FindProfileOptions {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    id?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email?: string;
}
