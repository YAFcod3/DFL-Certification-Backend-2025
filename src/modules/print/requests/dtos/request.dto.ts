import {
    IsEnum,
    ValidateNested,
    IsObject,
} from 'class-validator';
import {Type, TypeHelpOptions} from 'class-transformer';
import {NotificationType, DocumentType} from "../enums/enum";
import {PassportMetadataDto} from "./passport-metadata.dto";
import {DniMetadataDto} from "./dni-metadata.dto";
import {AccreditationMetadataDto} from "./accreditation-metadata.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePrintRequestDto {

    @ApiProperty({
        enum: DocumentType,
        example: DocumentType.PASSPORT,
        description: 'Type of document to be printed',
    })
    @IsEnum(DocumentType)
    documentType: DocumentType;

    @ApiProperty({
        enum: NotificationType,
        example: NotificationType.BATCH,
        description: 'Type of notification to send',
    })
    @IsEnum(NotificationType)
    notificationType: NotificationType;


    @ApiProperty({
        oneOf: [
            { $ref: '#/components/schemas/PassportMetadataDto' },
            { $ref: '#/components/schemas/DniMetadataDto' },
            { $ref: '#/components/schemas/AccreditationMetadataDto' },
        ],
        description: 'Metadata depending on the document type',
    })
    @IsObject()
    @ValidateNested()
    @Type((type: TypeHelpOptions) => {
        if (type?.object) {
            switch (type.object.documentType) {
                case DocumentType.DNI:
                    return DniMetadataDto;
                case DocumentType.ACCREDITATION:
                    return AccreditationMetadataDto;
                case DocumentType.PASSPORT:
                default:
                    return PassportMetadataDto;
            }
        }
        return PassportMetadataDto;
    })
    metadata: PassportMetadataDto | DniMetadataDto | AccreditationMetadataDto;
}
