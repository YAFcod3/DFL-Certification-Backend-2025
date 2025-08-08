import {IsNotEmpty, IsString} from "class-validator";

export class CreateAppLogDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    method: string;

    @IsString()
    @IsNotEmpty()
    path: string;
}
