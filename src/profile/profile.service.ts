import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto, FindProfileOptions } from 'src/common/dto';
import { IMessageResponse } from 'src/common/interface/response.interface';
import { ProfileModel } from 'src/common/sequelize/models/profile.model';
import { PortfolioService } from 'src/portfolio/portfolio.service';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(ProfileModel)
        private readonly profileModel: typeof ProfileModel,
        @Inject(PortfolioService)
        private readonly portfolioService: PortfolioService,
    ) {}

    async create(createProfileDto: CreateProfileDto): Promise<ProfileModel> {
        const profile: ProfileModel = await this.profileModel.create(createProfileDto);
        return profile;
    }

    async findOne(option: FindProfileOptions): Promise<ProfileModel> {
        if (!Object.values(option).some(Boolean)) {
            throw new BadRequestException('At least one search parameter must be provided');
        }
        const profile = await this.profileModel.findOne({
            where: {
                ...option,
            },
        });
        return profile;
    }

    async delete(id: string): Promise<IMessageResponse> {
        await this.portfolioService.deleteByProfileId(id);
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
