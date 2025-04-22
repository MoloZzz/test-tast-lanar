import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ProfileModel } from './profile.model';
import { ImageModel } from './image.model';

@Table({ tableName: 'portfolios' })
export class PortfolioModel extends Model<PortfolioModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ type: DataType.TEXT })
    description: string;

    @ForeignKey(() => ProfileModel)
    @Column({ type: DataType.UUID })
    profileId: string;

    @BelongsTo(() => ProfileModel)
    profile: ProfileModel;

    @HasMany(() => ImageModel)
    images: ImageModel[];
}
