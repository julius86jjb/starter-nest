import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductsImagesService } from './products-images.service';
import { CreateProductImageDto } from './dtos/create-product-image.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Controller('products-images')
export class ProductsImagesController {
  constructor(private readonly productsImagesService: ProductsImagesService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @Body() createProductImageDto: CreateProductImageDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productsImagesService.uploadProductImage(createProductImageDto, file)
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  uploadImages(
    @Body() createProductImageDto: CreateProductImageDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.productsImagesService.uploadProductsImage(createProductImageDto, files)
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDto) {
    return this.productsImagesService.findAll(paginationDTO);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsImagesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsImagesService.remove(id);
  }
  

  


}
