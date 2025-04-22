import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ProfileModel } from './profile.model';
import { ImageModel } from './image.model';

@Table({ tableName: 'comments' })
export class CommentModel extends Model<CommentModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({ type: DataType.TEXT })
    content: string;

    @ForeignKey(() => ProfileModel)
    @Column({ type: DataType.UUID })
    profileId: string;

    @BelongsTo(() => ProfileModel)
    profile: ProfileModel;

    @ForeignKey(() => ImageModel)
    @Column({ type: DataType.UUID })
    imageId: string;

    @BelongsTo(() => ImageModel)
    image: ImageModel;
}
