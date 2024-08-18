import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class CreateDepartmentDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString({ each: true })
  @IsArray()
  titles: string[];

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  img?: string;

  @IsString()
  icon: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  views?: number;

  @IsArray()
  @IsOptional()
  categories?: CreateCategoryDto[];
}
