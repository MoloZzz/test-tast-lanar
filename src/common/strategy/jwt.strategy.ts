import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ProfileService } from 'src/profile/profile.service';
import { IJwtPayload } from '../interface/jwt-payload.interface';
import { ProfileModel } from '../sequelize/models/profile.model';
import { StrategyEnum } from '../enum/strategy.enum';
import { AuthService } from 'src/auth/auth.service';
import { ResponseProfileDto } from '../dto/response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyEnum.jwt) {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: IJwtPayload): Promise<ResponseProfileDto> {
        const profile: ResponseProfileDto = await this.authService.validateUserByPayload(payload);
        if (!profile) {
            throw new UnauthorizedException('Profile not found');
        }
        return profile;
    }
}
