import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UUIDParamDto } from 'src/common/dto';

@ApiTags('Profile CRUD API')
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

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
