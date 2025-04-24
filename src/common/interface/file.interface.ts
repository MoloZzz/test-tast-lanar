import * as fs from 'fs';

export interface IFile {
    stream: fs.ReadStream;
    mimetype: string;
    size: number;
}
