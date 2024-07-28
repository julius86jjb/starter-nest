import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Question } from './entities/question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    TypeOrmModule.forFeature([Question]),
    CommonModule
  ]
})
export class QuestionsModule {}
