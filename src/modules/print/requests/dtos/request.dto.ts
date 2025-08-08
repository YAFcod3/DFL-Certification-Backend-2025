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

export class CreatePrintRequestDto {
    @IsEnum(DocumentType)
    documentType: DocumentType;

    @IsEnum(NotificationType)
    notificationType: NotificationType;

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
