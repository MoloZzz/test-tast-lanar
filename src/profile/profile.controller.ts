import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, FindProfileOptions, UUIDParamDto } from 'src/common/dto';
import { ProfileModel } from 'src/common/sequelize/models/profile.model';

@ApiTags('Profile CRUD API')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

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

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a profile' })
    async deleteProfile(@Param() params: UUIDParamDto) {
        return this.profileService.delete(params.id);
    }
}
