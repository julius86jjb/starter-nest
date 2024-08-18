import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { DepartmentsModule } from '../departments/departments.module';
import { CategoriesModule } from '../categories/categories.module';
import { UsersModule } from '../users/users.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { QuestionsModule } from '../questions/questions.module';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { StoresModule } from '../stores/stores.module';
import { AuthModule } from '../users/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    DepartmentsModule, 
    CategoriesModule, 
    UsersModule, 
    ReviewsModule, 
    QuestionsModule, 
    ProductsModule, 
    OrdersModule, 
    StoresModule,
    AuthModule
  ]
})
export class SeedModule { }
