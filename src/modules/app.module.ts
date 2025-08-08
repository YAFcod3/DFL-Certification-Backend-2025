import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from 'dotenv';
import {ConfigModule} from "@nestjs/config";
import {EnvConfiguration} from "../config/env.config";
import {JoiValidationSchema} from "../config/joi.validation";
import {PrintModule} from "./print/print.module";

dotenv.config();

@Module({
  imports: [
      ConfigModule.forRoot(
          {
              load: [EnvConfiguration],
              validationSchema: JoiValidationSchema
          }
      ) ,
      MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
      PrintModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
