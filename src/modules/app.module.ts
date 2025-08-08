import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from 'dotenv';
import {ConfigModule} from "@nestjs/config";
import {EnvConfiguration} from "../config/env.config";
import {JoiValidationSchema} from "../config/joi.validation";
import {PrintModule} from "./print/print.module";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../common/strategies/jwt.strategy";
import { AppLogsModule } from './app-logs/app-logs.module';

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
      PassportModule.register({ defaultStrategy: 'jwt' }),
      PrintModule,
      AppLogsModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
