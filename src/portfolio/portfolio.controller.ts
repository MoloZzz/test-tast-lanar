import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto, UUIDParamDto } from 'src/common/dto';
import { Request } from 'express';
import { IProfile } from 'src/common/interface/profile.interface';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { PortfolioModel } from 'src/common/sequelize/models/portfolio.model';

@ApiTags('Portfolio API')
@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    @Get('profile/:id')
    @ApiOperation({ summary: 'Get all portfolios by profile id' })
    async getPortfoliosByProfileId(@Param() params: UUIDParamDto) {
        return this.portfolioService.getPortfoliosByProfileId(params.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get portfolio by id' })
    async getPortfolioById(@Param() params: UUIDParamDto) : Promise<PortfolioModel> {
        return this.portfolioService.getPortfolioById(params.id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new portfolio' })
    @ApiBearerAuth()
    async create(@Body() data: CreatePortfolioDto, @Req() req: Request): Promise<PortfolioModel> {
        const profile: IProfile = req.user as IProfile;
        return this.portfolioService.create(profile.id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete your portfolio' })
    @ApiBearerAuth()
    async delete(@Param() params: UUIDParamDto, @Req() req: Request): Promise<void> {
        const profile: IProfile = req.user as IProfile;
        return this.portfolioService.delete(profile.id, params.id);
    }
}
