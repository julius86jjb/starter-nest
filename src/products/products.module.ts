import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { QuestionsModule } from './questions/questions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    QuestionsModule,
    ReviewsModule,
    TypeOrmModule.forFeature([ProductImage, Product]),
    CommonModule
  ],
})
export class ProductsModule {}
