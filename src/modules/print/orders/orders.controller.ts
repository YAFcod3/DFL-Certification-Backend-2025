import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {OrdersService} from "./orders.service";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {PaginationDto} from "../../../common/dtos/pagination.dto";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags('orders')
@ApiBearerAuth('jwt')
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: 'List all print requests' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    @Get()
    findAll(@Query() dto: PaginationDto) {
        return this.ordersService.findAll(dto);
    }

@ApiOperation({ summary: 'Get a order by ID' })
@ApiParam({ name: 'id', type: String, example: '66b4c84aeb5c8c2eac98dcf4' })
    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: string) {
        return this.ordersService.findOne(id);
    }

}
