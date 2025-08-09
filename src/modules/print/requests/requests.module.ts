import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import {MongooseModule} from "@nestjs/mongoose";
import {PrintRequest, PrintRequestSchema} from "./schemas/print-request.schema";
import {OrdersModule} from "../orders/orders.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PrintRequest.name, schema: PrintRequestSchema }]),
    OrdersModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
