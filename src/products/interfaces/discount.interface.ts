import { IsNumber, IsString } from "class-validator";

export class Discount {
    @IsNumber()
    price: number;

    @IsString()
    finish: Date;
}