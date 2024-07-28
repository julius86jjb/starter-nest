import { IsUUID, IsString, IsOptional, IsIn } from "class-validator";
import { Product } from "src/products/entities/product.entity";
import { Store } from "src/stores/entities/store.entity";
import { User } from "src/users/entities/user.entity";

export class CreateQuestionDto {
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

  @IsString()
  question: string;

  @IsString()
  @IsOptional()
  answer: string;
}
