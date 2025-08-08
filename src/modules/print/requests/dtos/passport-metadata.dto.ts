import { IsString } from 'class-validator';

export class PassportMetadataDto {
    @IsString()
    number: string;

    @IsString()
    name: string;

    @IsString()
    placeOfBirth: string;

    @IsString()
    countryOfBirth: string;
}
