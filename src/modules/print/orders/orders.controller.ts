import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {PaginationDto} from "../../../common/dtos/pagination.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
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
