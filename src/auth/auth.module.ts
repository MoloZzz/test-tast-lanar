import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileModule } from 'src/profile/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StrategyEnum } from 'src/common/enum/strategy.enum';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';

@Module({
    imports: [
        forwardRef(() => ProfileModule),
        PassportModule.register({ defaultStrategy: StrategyEnum.jwt }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
