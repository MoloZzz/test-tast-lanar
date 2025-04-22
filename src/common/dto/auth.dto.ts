import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
    @ApiProperty({ example: 'user@example.com' })
    email: string;
    @ApiProperty({ example: 'password123' })
    password: string;
}

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
