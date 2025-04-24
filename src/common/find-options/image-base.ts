import { FindOptions } from 'sequelize';
import { CommentModel } from '../sequelize/models/comment.model';
import { FileModel } from '../sequelize/models/file.model';
import { PortfolioModel } from '../sequelize/models/portfolio.model';

export const baseImageFindOptions: FindOptions = {
    attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
    include: [
        {
            model: PortfolioModel,
            attributes: ['id', 'name'],
        },
        {
            model: FileModel,
            attributes: ['id', 'filename', 'path'],
        },
        CommentModel,
    ],
};
