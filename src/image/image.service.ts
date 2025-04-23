import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateImageDto } from 'src/common/dto';
import { ImageModel } from 'src/common/sequelize/models/image.model';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel(ImageModel)
        private readonly imageModel: typeof ImageModel,
    ) {}

    async getAllImagesByOdata(query: any) {
        throw new Error('Method not implemented.');
    }
    async getByPortfolioId(id: string) {
        throw new Error('Method not implemented.');
    }
    async getById(id: string) {
        throw new Error('Method not implemented.');
    }
    async create(data: CreateImageDto) {
        throw new Error('Method not implemented.');
    }
}
