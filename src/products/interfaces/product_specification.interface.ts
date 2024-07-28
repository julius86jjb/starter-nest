import { IsString } from "class-validator";

export class ProductSpecification {
  @IsString()
  property: string;

  @IsString()
  value: string;
}
