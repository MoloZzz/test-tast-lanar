import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyEnum } from '../enum/strategy.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyEnum.jwt) {}
