import { IsArray, IsString } from "class-validator";

export class ProductOption {
	@IsString()
	title_option: string;

	@IsArray()
	values: string[];
}

