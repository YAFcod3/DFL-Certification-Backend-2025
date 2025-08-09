import { Module } from '@nestjs/common';
import { AppLogsService } from './app-logs.service';
import { AppLogsController } from './app-logs.controller';
import {AppLogs, AppLogsSchema} from "./schema/app-log.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: AppLogs.name, schema: AppLogsSchema },
      ]),
  ],
  controllers: [AppLogsController],
  providers: [AppLogsService],
    exports: [AppLogsService],
})
export class AppLogsModule {}
