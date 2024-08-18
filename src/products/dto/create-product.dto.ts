import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { Department } from 'src/departments/entities/department.entity';
import { Store } from 'src/stores/entities/store.entity';
import { Discount } from '../interfaces/discount.interface';
import { HorizontalSlider } from '../interfaces/product_horizontal_slider';
import { ProductOption } from '../interfaces/product_option.interface';
import { ProductSpecification } from '../interfaces/product_specification.interface';
import { TopBanner } from '../interfaces/top_banner.interface';

export class CreateProductDto {
  @IsUUID()
  department: Department;

  @IsUUID()
  category: Category;

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  commision: number;

  @IsInt()
  @IsPositive()
  stock: number;

  
  @IsPositive()
  @IsNumber()
  shipping: number;

  @IsInt()
  @IsPositive()
  delivery_time: number;


  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ProductOption)
  options?: ProductOption[];

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  img_dest?: string;

  @IsArray()
  @IsOptional()
  features?: string[];

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  description_title?: string;

  @IsString()
  @IsOptional()
  description_text?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ProductSpecification)
  specifications?: ProductSpecification[];

  @IsString()
  @IsOptional()
  default_banner?: string;

  @IsString()
  @IsOptional()
  vertical_slider?: string;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Discount)
  discount?: Discount;

  @IsString()
  @IsOptional()
  @IsUrl()
  video?: string;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => TopBanner)
  top_banner?: TopBanner;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => HorizontalSlider)
  horizontal_slider?: HorizontalSlider;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];
}
