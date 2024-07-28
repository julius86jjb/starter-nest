import { IsString } from "class-validator";

export class HorizontalSlider {
  @IsString()
  h4: string;

  @IsString()
  h3_1: string;

  @IsString()
  h3_2: string;

  @IsString()
  h3_3: string;

  @IsString()
  h3_4s: string;

  @IsString()
  buton_text: string;

  @IsString()
  img: string;
}
