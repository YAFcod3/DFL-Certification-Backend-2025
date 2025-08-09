import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PassportMetadataDto {
    @ApiProperty({ example: 'A1234567' })
    @IsString()
    number: string;

    @ApiProperty({ example: 'Juan Sosa' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'La Habana' })
    @IsString()
    placeOfBirth: string;

    @ApiProperty({ example: 'Cuba' })
    @IsString()
    countryOfBirth: string;
}
