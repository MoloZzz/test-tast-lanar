import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { PortfolioModel } from './portfolio.model';
import { CommentModel } from './comment.model';
import { FileModel } from './file.model';

@Table({ tableName: 'images' })
export class ImageModel extends Model<ImageModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @ForeignKey(() => FileModel)
  @Column({ type: DataType.UUID })
  fileId: string;

  @BelongsTo(() => FileModel)
  file: File;

  @ForeignKey(() => PortfolioModel)
  @Column({ type: DataType.UUID })
  portfolioId: string;

  @BelongsTo(() => PortfolioModel)
  portfolio: PortfolioModel;

  @HasMany(() => CommentModel)
  comments: CommentModel[];
}
