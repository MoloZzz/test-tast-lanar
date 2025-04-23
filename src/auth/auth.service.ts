import { Injectable } from '@nestjs/common';
import { AuthResponseDto, LoginDto, ProfileDto, SignupDto } from 'src/common/dto';
import { IProfile } from 'src/common/interface/profile.interface';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class AuthService {
    constructor(private readonly profileService: ProfileService) {}

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        console.log('Login DTO:', loginDto);
        return { accessToken: 'dummy-token' };
    }

    async signup(signupDto: SignupDto): Promise<ProfileDto> {
        console.log('Signup DTO:', signupDto);
        return {} as ProfileDto;
    }

    async logout(profile: IProfile): Promise<{ message: string }> {
        return { message: 'Successfully logged out.' };
    }
}
