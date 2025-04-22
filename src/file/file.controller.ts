import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileService } from './file.service';

@ApiTags('File API')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
}
