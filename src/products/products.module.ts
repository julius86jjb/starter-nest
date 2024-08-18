import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CommonModule } from 'src/common/common.module';
import { ProductsImagesModule } from './products-images/products-images.module';
import { ProductImage } from './products-images/entities/product-image.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../users/auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([ProductImage, Product]),
    CommonModule,
    ProductsImagesModule,
    AuthModule
  ],
})
export class ProductsModule { }
