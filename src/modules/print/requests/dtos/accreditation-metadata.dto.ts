import { IsString, IsDateString } from 'class-validator';

export class AccreditationMetadataDto {
    @IsString()
    number: string;

    @IsString()
    name: string;

    @IsString()
    countryOfOrigin: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    role: string;
}
