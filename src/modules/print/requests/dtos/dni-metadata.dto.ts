import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DniMetadataDto {
    @ApiProperty({ example: '12345678' })
    @IsString()
    number: string;

    @ApiProperty({ example: 'Juan Sosa' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Ave 84 entre 5 y 6' })
    @IsString()
    address: string;

    @ApiProperty({ example: 'Tomo 5' })
    @IsString()
    tomo: string;

    @ApiProperty({ example: 'Folio 12' })
    @IsString()
    folio: string;
}
