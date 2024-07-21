import {
  IsString,
  IsEmail,
  IsBoolean,
  MaxLength,
  Matches,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @MinLength(5)
  userName: string;
  
  @IsString()
  first_name: string;
  
  @IsString()
  last_name: string;
  
  @IsString()
  country: string;
  
  @IsString()
  city: string;

  @IsString()
  address: string;
  
  @IsString()
  @IsOptional()
  phone?: string;
}
