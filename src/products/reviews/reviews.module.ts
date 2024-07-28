import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [
    TypeOrmModule.forFeature([Review]),
    CommonModule
  ]
})
export class ReviewsModule {}
