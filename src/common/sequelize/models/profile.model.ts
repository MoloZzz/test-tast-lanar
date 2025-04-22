import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { PortfolioModel } from './portfolio.model';
import { CommentModel } from './comment.model';

@Table({ tableName: 'profiles' })
export class ProfileModel extends Model<ProfileModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({ unique: true, allowNull: false })
    email: string;

    @Column({ allowNull: false })
    password: string;

    @HasMany(() => PortfolioModel)
    portfolios: PortfolioModel[];

    @HasMany(() => CommentModel)
    comments: Comment[];
}
