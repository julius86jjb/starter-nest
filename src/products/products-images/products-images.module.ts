import { Module } from '@nestjs/common';
import { ProductsImagesService } from './products-images.service';
import { ProductsImagesController } from './products-images.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CommonModule } from 'src/common/common.module';
import { ProductImage } from './entities/product-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProductsImagesController],
  providers: [ProductsImagesService],
  imports: [
    CloudinaryModule, 
    CommonModule, 
    TypeOrmModule.forFeature([ProductImage]),
  ]
})
export class ProductsImagesModule { }
