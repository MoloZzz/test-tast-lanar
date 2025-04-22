import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, AuthResponseDto, ProfileDto } from 'src/common/dto';
import { Request } from 'express';
import { IProfile } from 'src/common/interface/profile.interface';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiOperation({ summary: 'Register a new Profile' })
    @ApiBody({ type: SignupDto })
    async signup(@Body() signupDto: SignupDto): Promise<ProfileDto> {
        // TODO: Implement logic in AuthService
        // return this.authService.signup(signupDto);
        console.log('Signup DTO:', signupDto);
        return {} as ProfileDto; // Placeholder
    }

    @Post('login')
    @ApiOperation({ summary: 'Log in an existing Profile' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        // TODO: Implement logic in AuthService
        // return this.authService.login(loginDto);
        console.log('Login DTO:', loginDto);
        return { accessToken: 'dummy-token' }; // Placeholder
    }

    @Post('logout')
    @ApiOperation({ summary: 'Log out the current Profile (optional)' })
    async logout(@Req() req: Request): Promise<{ message: string }> {
        // const profile = req.profile as IProfile;
        // TODO: Implement logic in AuthService
        // await this.authService.logout(Profile);
        return { message: 'Successfully logged out.' }; // Placeholder
    }
}
