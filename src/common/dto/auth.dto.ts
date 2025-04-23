import { ApiProperty } from '@nestjs/swagger';
import { CreateProfileDto } from './profile.dto';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto extends CreateProfileDto {}

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsDefined()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsDefined()
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;
}

export class AuthResponseDto {
    @ApiProperty({ description: 'Access Token' })
    accessToken: string;
}
