import {Injectable, BadRequestException, NotFoundException, InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types} from 'mongoose';
import { CreatePrintRequestDto } from './dtos/request.dto';
import { PrintRequest, PrintRequestDocument } from './schemas/print-request.schema';
import { OrdersService } from '../orders/orders.service';
import { OrderDocument } from '../orders/schemas/order.schema';
import {PaginationDto} from "../../../common/dtos/pagination.dto";

@Injectable()
export class RequestsService {
    constructor(
        @InjectModel(PrintRequest.name) private readonly printRequestModel: Model<PrintRequestDocument>,
        private readonly ordersService: OrdersService,
    ) {}


    async create(dto: CreatePrintRequestDto): Promise<PrintRequest> {
       try{
           const order = await this.ordersService.selectAvailableOrder(dto.documentType);

           const requestCode = this.generateRequestCode(order);

           const newRequest = new this.printRequestModel({
               code: requestCode,
               documentType: dto.documentType,
               receivedAt: new Date(),
               order: order._id,
               metadata: dto.metadata,
           });

           await newRequest.save();
           await this.ordersService.addRequestToOrder(order, newRequest._id as Types.ObjectId);

           return newRequest;
       }catch (error) {
           if (error instanceof BadRequestException) {
               throw error;
           }
           throw new InternalServerErrorException('Error creating print request');
       }
    }

    async findAll(paginationDto: PaginationDto):  Promise<{
        requests: PrintRequest[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        try {
            const { page, limit } = paginationDto;
            const skip = (page - 1) * limit;

            const requests = await this.printRequestModel
            .find()
            .skip(skip)
            .limit(limit)
            .exec();

            const total = await this.printRequestModel.countDocuments().exec();

            return {
                requests,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }catch (error) {
            throw new InternalServerErrorException('Error finding print requests');

        }
    }


    async findRequestsByOrderId(
        orderId: string,
        paginationDto: PaginationDto,
    ): Promise<{
        requests: PrintRequest[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        try {
            const { page, limit } = paginationDto;
            const skip = (page - 1) * limit;

            const requests = await this.printRequestModel
            .find({ order: orderId })
            .skip(skip)
            .limit(limit)
            .exec();

            const total = await this.printRequestModel.countDocuments({ order: orderId }).exec();

            if (!requests.length && total === 0) {
                throw new NotFoundException(
                    `No print requests found associated with order ID ${orderId}`,
                );
            }

            return {
                requests,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            if (error.name === 'CastError') {
                throw new BadRequestException('The provided orderId is invalid');
            }
            throw new InternalServerErrorException('Error retrieving print requests');
        }
    }


    async findOne(id: string): Promise<PrintRequest> {
        const request = await this.printRequestModel.findById(id).exec();
        if (!request) {
            throw new NotFoundException('Print request not found');
        }
        return request;
    }



    private generateRequestCode(order: OrderDocument): string {
        const count = order.requests?.length ?? 0;
        if (count >= 50) throw new BadRequestException('Order full (50 requests max)');
        return `S${(count + 1).toString().padStart(2, '0')}`;
    }


}
