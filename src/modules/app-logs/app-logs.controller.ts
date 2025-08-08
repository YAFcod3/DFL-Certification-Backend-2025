import {Controller, Get, Query} from '@nestjs/common';
import { AppLogsService } from './app-logs.service';

@Controller('app-logs')
export class AppLogsController {
  constructor(private readonly appLogsService: AppLogsService) {}

  @Get('summary')
  getSummary() {
    return this.appLogsService.getSummary();
  }

  @Get()
  findByUrl(@Query('url') url: string) {
    return this.appLogsService.findByUrl(url);
  }

  @Get('stats')
  getStatsByUrl(@Query('url') url: string) {
    return this.appLogsService.getStatsByUrl(url);
  }

}
