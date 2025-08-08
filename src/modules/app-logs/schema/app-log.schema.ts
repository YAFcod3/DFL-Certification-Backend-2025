import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AppLogs extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    method: string;

    @Prop({ required: true })
    path: string;
}

export const AppLogsSchema = SchemaFactory.createForClass(AppLogs);
