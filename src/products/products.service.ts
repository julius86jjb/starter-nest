import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { HandleExceptionsService } from 'src/common/services/handle-exceptions.service';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductImage } from './products-images/entities/product-image.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
    private handleExceptionsService: HandleExceptionsService,
  ) { }

  async create(createProductDto: CreateProductDto, user: User) {

    try {
      const { images = [], ...productDetails } = createProductDto
      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(image => this.productImageRepository.create({ url: image })),
        store: user.store
      })

      await this.productRepository.save(product);

      return { ...product, images: images }
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return await this.productRepository.find({
      take: limit,
      skip: offset,

      //si no tuvieramos el eager:

      // relations: {
      //   images: true,
      // }
    });

    // return products.map(product => ({
    //   ...product,
    //   images: product.images.map(img => img.url)
    // }))
  }

  async findOne(term: string) {
    let product: Product;

    if (isUUID(term))
      product = await this.productRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder.where('UPPER(name) = :name or slug =:slug', {
        slug: term.toLowerCase(),
        name: term.toUpperCase(),
      })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!product) throw new NotFoundException(`product with  ${term} not found`);

    return product;
  }

  async findOnePlain(term: string) {
    const product = await this.findOne(term)
    return {
      ...product,
      images: product.images.map(img => img.url)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {

    const { images, ...toUpdate } = updateProductDto;

    const product = await this.productRepository.preload({ //preload no carga las relaciones
      id: id,
      ...toUpdate
    })

    if (!product) throw new NotFoundException(`Product with id ${id} not found`)

    if (user.store !== product.store)
      throw new UnauthorizedException('This product does not belong to your store ')

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: id })
        product.images = images.map(
          image => this.productImageRepository.create({ url: image })
        )
      }
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);

    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    const product = await this.findOne(id);

    if (user.store !== product.store)
      throw new UnauthorizedException('This product does not belong to your store ')

    await this.productRepository.remove(product);
  }

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product')

    try {
      return await query
        .delete()
        .where({})
        .execute()
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }



}
