import {
  IsOptional,
    IsString,
    IsUUID
} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';



export class CreateProductImageDto {


  @IsUUID()
  product: Product;

  @IsString()
  @IsOptional()
  url: string;

  
}
