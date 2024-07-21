
import { IsEnum, IsString } from "class-validator";

export enum SocialNetworkType {
    instagram = 'instagram',
    facebook = 'facebook',
    X = 'X',
    linkedin = 'linkedin'
}

export class SocialNetwork { 
    @IsString()
    @IsEnum(SocialNetworkType)
    type: SocialNetworkType;

    @IsString()
	link: string;
}

