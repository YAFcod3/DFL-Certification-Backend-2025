import {Body, Controller, Delete, Get, Param, Patch} from '@nestjs/common';
import {OrdersService} from "./orders.service";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: any) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.ordersService.remove(+id);
    // }

}
