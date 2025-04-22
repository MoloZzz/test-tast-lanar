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
        return this.authService.signup(signupDto);
        
    }

    @Post('login')
    @ApiOperation({ summary: 'Log in an existing Profile' })
    @ApiBody({ type: LoginDto })
    async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.authService.login(loginDto);

    }

    @Post('logout')
    @ApiOperation({ summary: 'Log out the current Profile (optional)' })
    async logout(@Req() req: Request): Promise<{ message: string }> {
        const profile = {}; //req.profile as IProfile;
        return this.authService.logout(profile);
    }
}
