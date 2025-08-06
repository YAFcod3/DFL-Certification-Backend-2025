import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {CreatePrintRequestDto} from "./dtos/request.dto";
import {RequestsService} from "./requests.service";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {PaginationDto} from "../../common/dtos/pagination.dto";

@Controller('requests')
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) {}

    @Post()
    create(@Body() createRequestDto: CreatePrintRequestDto) {
      return this.requestsService.create(createRequestDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return this.requestsService.findAll(paginationDto);
    }

    @Get(':id')
    async findOne(@Param('id', ParseObjectIdPipe) id: string) {
        return this.requestsService.findOne(id);
    }

    @Get('/order/:id')
    async findRequestsByOrderId(
        @Param('id', ParseObjectIdPipe) orderId: string,
        @Query() paginationDto: PaginationDto,
    ) {
        return this.requestsService.findRequestsByOrderId(orderId, paginationDto);
    }







}



