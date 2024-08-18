import {
  IsArray,
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SocialNetwork } from '../interfaces/social-network.interface';
import { Type } from 'class-transformer';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsString()
  about: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  cover_img?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => SocialNetwork)
  social_networks?: SocialNetwork[];

  @IsInt()
  @IsPositive()
  @IsOptional()
  products_count?: number;

}
