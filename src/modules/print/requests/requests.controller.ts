import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CreatePrintRequestDto} from "./dtos/request.dto";
import {RequestsService} from "./requests.service";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {PaginationDto} from "../../../common/dtos/pagination.dto";

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


    @Put(':id')
    async update(
        @Param('id', ParseObjectIdPipe) id: string,
        @Body() updateDto: Partial<CreatePrintRequestDto>,
    ) {
        return this.requestsService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseObjectIdPipe) id: string) {
        return this.requestsService.remove(id);
    }


    @Get('/order/:id')
    async findRequestsByOrderId(
        @Param('id', ParseObjectIdPipe) orderId: string,
        @Query() paginationDto: PaginationDto,
    ) {
        return this.requestsService.findRequestsByOrderId(orderId, paginationDto);
    }






}



