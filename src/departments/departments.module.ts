import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Department } from './entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [TypeOrmModule.forFeature([Department, Category])],
})
export class DepartmentsModule {}
