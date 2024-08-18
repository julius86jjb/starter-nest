import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';
import { Status } from '../entities/order.entity';

export class CreateOrderDto {
  @IsUUID()
  store: Store;

  @IsUUID()
  product: Product;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  total_price: number;

  @ValidateNested()
  @Type(() => Status)
  status: Status;

  @IsString()
  payment_method;

  @IsString()
  @IsOptional()
  id_payment?;

  @IsBoolean()
  completed: boolean;
}
