import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {DocumentType, NotificationType} from "../enums/enum";
import {PassportMetadataDto} from "../dtos/passport-metadata.dto";
import {DniMetadataDto} from "../dtos/dni-metadata.dto";
import {AccreditationMetadataDto} from "../dtos/accreditation-metadata.dto";

@Schema()
export class PrintRequest {
    @Prop({ required: true })
    code: string;

    @Prop({ enum: DocumentType, required: true  })
    documentType: DocumentType;

    @Prop({ enum: NotificationType, required: true })
    notificationType: NotificationType;

    @Prop()
    receivedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
    order: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.Mixed })
    metadata: PassportMetadataDto | DniMetadataDto | AccreditationMetadataDto;
}

export const PrintRequestSchema = SchemaFactory.createForClass(PrintRequest);
export type PrintRequestDocument = PrintRequest & Document;
