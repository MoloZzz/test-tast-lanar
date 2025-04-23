import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { PortfolioModel } from './portfolio.model';
import { CommentModel } from './comment.model';
import { Exclude } from 'class-transformer';

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

    @Column({ unique: true, allowNull: false })
    username: string;

    @Exclude()
    @Column({ allowNull: false })
    password: string;

    @HasMany(() => PortfolioModel)
    portfolios: PortfolioModel[];

    @HasMany(() => CommentModel)
    comments: Comment[];
}
