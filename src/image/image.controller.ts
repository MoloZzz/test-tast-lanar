import {
    Body,
    Controller,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { CreateImageDto, CreateImageMultipartDto, OdataQueryDto, UUIDParamDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { IProfile } from 'src/common/interface/profile.interface';
import { diskStorage } from 'multer';
import * as os from 'os';
import * as path from 'path';

@ApiTags('Image CRUD API')
@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get()
    @ApiOperation({ summary: 'Get all images by odata query' })
    async getAllImages(@Query() query: OdataQueryDto) {
        return this.imageService.getAllImagesByOdata(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get image by id' })
    async getImageById(@Param() params: UUIDParamDto) {
        return this.imageService.getById(params.id);
    }

    @Get('/portfolio/:id')
    @ApiOperation({ summary: 'Get image by portfolio id' })
    async getImageByPortfolioId(@Param() params: UUIDParamDto) {
        return this.imageService.getByPortfolioId(params.id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create image' })
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({ 
            destination: os.tmpdir(),
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = path.extname(file.originalname);
                file.originalname = Buffer.from(file.originalname, 'latin1').toString();
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })) // Use the diskStorage to save the file temporarily
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateImageMultipartDto})
    async createImage(@UploadedFile() file: Express.Multer.File, @Body() data: CreateImageDto, @Req() req: Request) {
        const profile: IProfile = req.user as IProfile;
        return this.imageService.create(file, data, profile.id);
    }
}
