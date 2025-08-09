import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UrlQueryDto {
    @ApiProperty({
        description: 'Base URL of the application to filter logs by',
        example: 'https://cervezaparranda.com',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    url: string;
}
