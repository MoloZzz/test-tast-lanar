import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';
import { UUIDParamDto } from 'src/common/dto';
import { Response } from 'express';

@ApiTags('File API')
@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get file by ID' })
    async getFile(@Param() params: UUIDParamDto, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        const fileData = await this.fileService.getFileContentByFileId(params.id);
        res.set({
            'Content-Type': fileData.mimetype,
            'Content-Disposition': `inline; filename="${fileData.mimetype.split('/')[1]}"`,
            'Content-Length': fileData.size,
        });
        return new StreamableFile(fileData.stream);
    }
}
