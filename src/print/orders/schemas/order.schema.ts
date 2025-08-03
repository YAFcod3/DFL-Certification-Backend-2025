import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document, Types} from "mongoose";
import {DocumentType} from "../../requests/enums/enum";

@Schema()
export class Order {
    @Prop({ enum: DocumentType })
    documentType: DocumentType;

    @Prop()
    createdAt: Date;

    @Prop()
    code: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PrintRequest' }] })
    requests: Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document;
