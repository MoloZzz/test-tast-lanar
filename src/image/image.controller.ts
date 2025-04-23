import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { CreateImageDto, OdataQueryDto, UUIDParamDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

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
    @ApiOperation({ summary: 'Create image' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createImage(@Body() data: CreateImageDto) {
        return this.imageService.create(data);
    } 
}
