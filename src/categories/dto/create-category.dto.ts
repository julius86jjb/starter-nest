import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Department } from 'src/departments/entities/department.entity';

export class CreateCategoryDto {
  @IsString()
  name: string;
  
  @IsString()
  department_title: string;

  @IsUUID()
  @IsOptional()
  department?: Department;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  img?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  inventory?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  views?: number;
}
