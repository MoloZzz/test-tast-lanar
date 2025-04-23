import { ApiProperty } from '@nestjs/swagger';
import { CreateProfileDto } from './profile.dto';

export class SignupDto extends CreateProfileDto {}

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    email: string;
    @ApiProperty({ example: 'password123' })
    password: string;
}

export class AuthResponseDto {
    @ApiProperty({ description: 'Access Token' })
    accessToken: string;
}
