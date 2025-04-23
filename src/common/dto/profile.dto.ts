import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { OnlyOneField } from '../custom-validator/only-one-field';

export class ProfileDto {
    @ApiProperty({ description: 'UUID' })
    @IsUUID()
    id: string;

    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    @IsDefined()
    @IsEmail()
    email: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2023-10-27T10:00:00.000Z' })
    @Type(() => Date)
    createdAt: Date;
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

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
}

export class UpdateProfileDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

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
