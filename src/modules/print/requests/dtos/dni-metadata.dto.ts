import { IsString } from 'class-validator';

export class DniMetadataDto {
    @IsString()
    number: string;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    tomo: string;

    @IsString()
    folio: string;
}
