import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthResponseDto, LoginDto, ProfileDto, SignupDto } from 'src/common/dto';
import { ProfileService } from 'src/profile/profile.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IMessageResponse } from 'src/common/interface/response.interface';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from 'src/common/interface/jwt-payload.interface';
import { ProfileModel } from 'src/common/sequelize/models/profile.model';
import { ResponseProfileDto } from 'src/common/dto/response.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => ProfileService))
        private readonly profileService: ProfileService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    generateToken(id: string, email: string, username: string): string {
        const payload: IJwtPayload = {
            sub: id,
            email: email,
            username: username,
        };
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }

    async signup(signupDto: SignupDto): Promise<ProfileDto> {
        const existingProfile = await this.profileService.findOne({ email: signupDto.email });
        if (existingProfile) {
            throw new BadRequestException('Profile with this email already exists');
        }

        const hashedPassword: string = await bcrypt.hash(signupDto.password, 10);
        const createdProfile: ProfileModel = await this.profileService.create({ ...signupDto, password: hashedPassword });
        return plainToClass(ProfileDto, createdProfile, { excludeExtraneousValues: true });
    }

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const profile = await this.profileService.findOne({ email: loginDto.email });
        if (!profile || !(await bcrypt.compare(loginDto.password, profile.password))) {
            throw new UnauthorizedException('Wrong email or password');
        }

        const accessToken = this.generateToken(profile.id, profile.email, profile.username);
        return { accessToken };
    }

    async validateUserByPayload(payload: IJwtPayload): Promise<ResponseProfileDto | null> {
        const profile = await this.profileService.findOne({ id: payload.sub });
        return plainToClass(ResponseProfileDto, profile, { excludeExtraneousValues: true });
    }

    // Now we can loguot only on clients side (remove token from localStorage/cookies).
    // It will help when we realize white list of tokens.
    async logout(req: Request, res: Response): Promise<IMessageResponse> {
        // some logic to invalidate the token on the server side
        res.clearCookie('Authentication');
        return { message: 'Successfully logged out.' };
    }
}
