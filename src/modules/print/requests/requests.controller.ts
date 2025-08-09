import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {CreatePrintRequestDto} from "./dtos/request.dto";
import {RequestsService} from "./requests.service";
import {ParseObjectIdPipe} from "@nestjs/mongoose";
import {PaginationDto} from "../../../common/dtos/pagination.dto";
import {AuthGuard} from "@nestjs/passport";
import {ApiBearerAuth, ApiExtraModels, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PassportMetadataDto} from "./dtos/passport-metadata.dto";
import {DniMetadataDto} from "./dtos/dni-metadata.dto";
import {AccreditationMetadataDto} from "./dtos/accreditation-metadata.dto";

@ApiTags('print-requests')
@ApiBearerAuth('jwt')
@ApiExtraModels(PassportMetadataDto, DniMetadataDto, AccreditationMetadataDto)
@Controller('print-requests')
@UseGuards(AuthGuard('jwt'))
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) {}

    @ApiOperation({ summary: 'Create a print request' })
    @ApiResponse({ status: 201, description: 'Created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @Post()
    create(@Body() createRequestDto: CreatePrintRequestDto) {
      return this.requestsService.create(createRequestDto);
    }

    @ApiOperation({ summary: 'List all print requests' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return this.requestsService.findAll(paginationDto);
    }

    @ApiOperation({ summary: 'Get a print request by ID' })
    @ApiParam({ name: 'id', type: String, example: '66b4c84aeb5c8c2eac98dcf4' })
    @Get(':id')
    async findOne(@Param('id', ParseObjectIdPipe) id: string) {
        return this.requestsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a print request' })
    @ApiParam({ name: 'id', type: String })
    @Put(':id')
    async update(
        @Param('id', ParseObjectIdPipe) id: string,
        @Body() updateDto: Partial<CreatePrintRequestDto>,
    ) {
        return this.requestsService.update(id, updateDto);
    }

    @ApiOperation({ summary: 'Delete a print request' })
    @ApiParam({ name: 'id', type: String })
    @Delete(':id')
    async remove(@Param('id', ParseObjectIdPipe) id: string) {
        return this.requestsService.remove(id);
    }


    @ApiOperation({ summary: 'Get print requests by Order ID' })
    @ApiParam({ name: 'id', type: String, example: '66b4c84aeb5c8c2eac98dcf4' })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    @Get('/order/:id')
    async findRequestsByOrderId(
        @Param('id', ParseObjectIdPipe) orderId: string,
        @Query() paginationDto: PaginationDto,
    ) {
        return this.requestsService.findRequestsByOrderId(orderId, paginationDto);
    }






}



