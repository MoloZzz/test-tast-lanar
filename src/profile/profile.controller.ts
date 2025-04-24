import { Body, Controller, Delete, forwardRef, Get, Inject, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, FindProfileOptions, UUIDParamDto } from 'src/common/dto';
import { ProfileModel } from 'src/common/sequelize/models/profile.model';
import { Request, Response } from 'express';
import { IProfile } from 'src/common/interface/profile.interface';
import { AuthService } from 'src/auth/auth.service';
import { IMessageResponse } from 'src/common/interface/response.interface';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@ApiTags('Profile CRUD API')
@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly authService: AuthService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find one profile by id, username, or email' })
    async findOne(@Query() query: FindProfileOptions): Promise<ProfileModel> {
        return this.profileService.findOne(query);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new profile. Use Auth.signup method to create profile' })
    async createProfile(@Body() data: CreateProfileDto) {
        return this.profileService.create(data);
    }

    @Delete()
    @ApiOperation({ summary: 'Delete own profile' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async deleteProfile(@Req() req: Request, @Res() res: Response): Promise<IMessageResponse> {
        const profile: IProfile = req.user as IProfile;
        await this.authService.logout(req, res);
        return this.profileService.delete(profile.id);
    }
}
