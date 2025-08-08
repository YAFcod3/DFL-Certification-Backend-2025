import { Controller, Get, Param, Query} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {PaginationDto} from "../../../common/dtos/pagination.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll(@Query() dto: PaginationDto) {
        return this.ordersService.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: string) {
        return this.ordersService.findOne(id);
    }

}
