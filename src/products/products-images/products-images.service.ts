import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { HandleExceptionsService } from 'src/common/services/handle-exceptions.service';
import { CreateProductImageDto } from './dtos/create-product-image.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Injectable()
export class ProductsImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private cloudinaryService: CloudinaryService,
    private handleExceptionsService: HandleExceptionsService,

  ) {

  }


  async uploadProductImage(createProductImageDto: CreateProductImageDto, file: Express.Multer.File) {
    const { secure_url } = await this.cloudinaryService.uploadFile(file, 'products');

    try {
      const product_image = this.productImageRepository.create({
        ...createProductImageDto,
        url: secure_url
      })

      await this.productImageRepository.save(product_image);

      return product_image
    } catch (error) {
      console.log(error);
      this.handleExceptionsService.handleDBExceptions(error);
    }

  }

  async uploadProductsImage(createProductImageDto: CreateProductImageDto, files: Express.Multer.File[]) {

    try {
      const insertPromises = [];
      files.forEach(async (file) => {
        insertPromises.push(this.uploadProductImage(createProductImageDto, file));

      });

      return await Promise.all(insertPromises);
    } catch (error) {
      console.log(error);
      this.handleExceptionsService.handleDBExceptions(error);
    }

  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.productImageRepository.find({
      take: limit,
      skip: offset,

    });
  }

  async findOne(id: string) {

    const image = await this.productImageRepository.findOneBy({ id });

    if (!image) throw new NotFoundException(`image with id ${id} not found`);
    return image;
  }

  async remove(id: string) {
    const image = await this.findOne(id);
    await this.productImageRepository.remove(image);
  }


}
