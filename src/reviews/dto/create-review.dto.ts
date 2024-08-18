import { IsIn, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { Product } from "src/products/entities/product.entity";
import { Store } from "src/stores/entities/store.entity";
import { User } from "src/users/entities/user.entity";
import { Column } from "typeorm";

export class CreateReviewDto {
  @IsUUID()
  @IsOptional()
  product?: Product;

  @IsUUID()
  @IsOptional()
  store?: Store;

  @IsString()
  @IsIn(['store', 'product'])
  type: string

  @IsUUID()
  user: User;

  @IsNumber()
  @IsPositive()
  rate: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  message?: string;

}
