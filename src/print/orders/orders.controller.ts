import { Controller, Get, Param, Query} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {PaginationDto} from "../../common/dtos/pagination.dto";
import {ParseObjectIdPipe} from "@nestjs/mongoose";

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

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateOrderDto: any) {
    //     return this.ordersService.update(+id, updateOrderDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.ordersService.remove(+id);
    // }

}
