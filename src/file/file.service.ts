import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as path from 'path';
import { FileModel } from 'src/common/sequelize/models/file.model';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const STATIC_FILES_PATH = path.join(__dirname, '..', '..', 'static');

@Injectable()
export class FileService {
    constructor(
        @InjectModel(FileModel)
        private readonly fileModel: typeof FileModel,
    ) {
        if (!fs.existsSync(STATIC_FILES_PATH)) {
            fs.mkdirSync(STATIC_FILES_PATH, { recursive: true });
            console.log(`Folder for static files created: ${STATIC_FILES_PATH}`);
        }
    }

    async saveFile(file: Express.Multer.File): Promise<FileModel> {
        const uniqueFilename: string = `${uuidv4()}${path.extname(file.originalname)}`;
        const targetPath: string = path.join(STATIC_FILES_PATH, uniqueFilename);
        await fs.promises.rename(file.path, targetPath);
        const dbPath = `/static/${uniqueFilename}`;
        try {
            const fileModel = await this.fileModel.create({
                filename: file.filename,
                originalname: file.originalname,
                path: dbPath,
                mimetype: file.mimetype,
                size: file.size,
            });
        return fileModel;
        } catch (error) {
            console.error('Error saving file to database:', error); 
        }
    }

    async getFileById(id: string): Promise<FileModel | null> {
        return this.fileModel.findByPk(id);
   }

   async deleteFile(id: string): Promise<void> {
        const fileRecord = await this.getFileById(id);
        if (fileRecord) {
             const filePath = path.join(STATIC_FILES_PATH, fileRecord.filename);
             try {
                  if (fs.existsSync(filePath)) {
                      await fs.promises.unlink(filePath);
                  }
                  await fileRecord.destroy();
             } catch (error) {
                  console.error(`Fail during removing file ${id}:`, error);
                  throw new InternalServerErrorException('Deletion error');
             }
        } else {
            throw new NotFoundException(`File with ID "${id}" not found`);
        }
   }
}
