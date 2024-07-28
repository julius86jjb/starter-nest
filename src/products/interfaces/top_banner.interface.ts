import { IsString } from "class-validator";

export class TopBanner {
  
  @IsString()
  h3: string;
  
  @IsString()
  p1: string;
  
  @IsString()
  h4: string;
  
  @IsString()
  p2: string;
  
  @IsString()
  span: string;
  
  @IsString()
  button_text: string;
  
  @IsString()
  img: string;
}
