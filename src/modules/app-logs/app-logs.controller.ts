import { Controller, Get, Query } from '@nestjs/common';
import { AppLogsService } from './app-logs.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {UrlQueryDto} from "./dto/url-query.dto";

@ApiTags('app-logs')
@Controller('app-logs')
export class AppLogsController {
  constructor(private readonly appLogsService: AppLogsService) {}

  @ApiOperation({ summary: 'Get summary of all app logs grouped by app and endpoint' })
  @Get('summary')
  getSummary() {
    return this.appLogsService.getSummary();
  }

  @ApiOperation({ summary: 'Get logs filtered by app URL' })
  @ApiQuery({ name: 'url', required: true, example: 'https://cervezaparranda.com' })
  @Get()
  findByUrl(@Query() query: UrlQueryDto) {
    return this.appLogsService.findByUrl(query.url);
  }

  @ApiOperation({ summary: 'Get usage stats grouped by endpoint for given app URL' })
  @ApiQuery({ name: 'url', required: true, example: 'https://cervezaparranda.com' })
  @Get('stats')
  getStatsByUrl(@Query() query: UrlQueryDto) {
    return this.appLogsService.getStatsByUrl(query.url);
  }
}
