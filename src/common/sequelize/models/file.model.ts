import { Table, Column, Model, DataType, HasOne } from 'sequelize-typescript';
import { ImageModel } from './image.model';

@Table({ tableName: 'files' })
export class FileModel extends Model<FileModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    filename: string;

    @Column
    mimetype: string;

    @Column
    encoding: string;

    @Column
    path: string;

    @Column({ type: DataType.INTEGER })
    size: number;

    @HasOne(() => ImageModel)
    image: ImageModel;
}
