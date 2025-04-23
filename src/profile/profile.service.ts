import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from 'src/common/dto';
import { ProfileModel } from 'src/common/sequelize/models/profile.model';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(ProfileModel)
        private readonly profileModel: typeof ProfileModel,
    ) {}

    async create(createProfileDto: CreateProfileDto): Promise<ProfileModel> {
        const profile: ProfileModel = await this.profileModel.create(createProfileDto);
        return profile;
    }

    async delete(id: string) {
        const deletedCount = await this.profileModel.destroy({
            where: {
                id,
            },
        });
        if (deletedCount === 0) {
            throw new NotFoundException('Profile not found');
        }
        return { message: `Profile ${id} deleted successfully` };
    }
}
