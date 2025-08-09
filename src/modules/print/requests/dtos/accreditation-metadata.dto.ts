import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class AccreditationMetadataDto {
    @ApiProperty({ example: 'ACC-9876' })
    @IsString()
    number: string;

    @ApiProperty({ example: 'Guillermo Soto' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Cuba' })
    @IsString()
    countryOfOrigin: string;

    @ApiProperty()
    @IsDateString()
    startDate: string;

    @ApiProperty()
    @IsDateString()
    endDate: string;

    @ApiProperty({ example: 'Estudiante' })
    @IsString()
    role: string;
}
