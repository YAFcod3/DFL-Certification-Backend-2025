import {Body, Controller, Post} from '@nestjs/common';
import {CreatePrintRequestDto} from "./dtos/request.dto";
import {RequestsService} from "./requests.service";

@Controller('requests')
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) {}

    @Post()
    create(@Body() createRequestDto: CreatePrintRequestDto) {
        console.log(createRequestDto);
      return this.requestsService.create(createRequestDto);
    }
    }



