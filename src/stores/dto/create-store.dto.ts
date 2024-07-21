import { IsArray, IsEmail, IsIn, IsInt, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { SocialNetwork, SocialNetworkType } from "../interfaces/social-network.interface";
import { Type } from "class-transformer";

export class CreateStoreDto {

    @IsString()
    name: string;
    
    @IsString()
    @IsEmail()
	email: string;
    
    @IsString()
	phone: string
    
    @IsString()
	address: string;

    @IsString()
	description: string;
    
    @IsString()
	about: string;

    @IsString()
    @IsOptional()
    slug?: string;
    
    
    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @Type(() => SocialNetwork)
	social_networks?: SocialNetwork[];
    
    @IsInt()
    @IsPositive()
	products_count: number;
}
