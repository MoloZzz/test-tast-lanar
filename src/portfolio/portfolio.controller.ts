import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from 'src/common/dto';
import { Request } from 'express';
import { IProfile } from 'src/common/interface/profile.interface';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@ApiTags('Portfolio API')
@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new portfolio' })
    @ApiBearerAuth()
    async create(@Body() data: CreatePortfolioDto, @Req() req: Request) {
        const profile: IProfile = req.user;
        return this.portfolioService.create(profile.id, data);

    }
}
