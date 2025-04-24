import { FindOptions } from "sequelize";
import { CommentModel } from "../sequelize/models/comment.model";
import { FileModel } from "../sequelize/models/file.model";
import { ImageModel } from "../sequelize/models/image.model";
import { ProfileModel } from "../sequelize/models/profile.model";

export const basePortfolioFindOptions: FindOptions = { 
    attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: ProfileModel,
                    attributes: ['id', 'username'],
                },
                {
                    model: ImageModel,
                    attributes: ['id', 'name', 'description'],
                    include: [
                        { model: FileModel, attributes: ['id', 'path', 'filename'] },
                        { model: CommentModel, attributes: ['id', 'content', 'profileId'] },
                    ],
                },
            ],
            order: [['createdAt', 'DESC']],
    }