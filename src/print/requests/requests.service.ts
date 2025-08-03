import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePrintRequestDto } from './dtos/request.dto';
import { PrintRequest, PrintRequestDocument } from './schemas/print-request.schema';
import { OrdersService } from '../orders/orders.service';
import { OrderDocument } from '../orders/schemas/order.schema';

@Injectable()
export class RequestsService {
    constructor(
        @InjectModel(PrintRequest.name) private readonly printRequestModel: Model<PrintRequestDocument>,
        private readonly ordersService: OrdersService,
    ) {}


    private generateRequestCode(order: OrderDocument): string {
        const count = order.requests?.length ?? 0;
        if (count >= 50) throw new BadRequestException('Order full (50 requests max)');
        return `S${(count + 1).toString().padStart(2, '0')}`;
    }

    async create(dto: CreatePrintRequestDto): Promise<PrintRequest> {
        let order = await this.ordersService.findAvailableOrder(dto.documentType);

        if (!order) {
            order = await this.ordersService.createOrder(dto.documentType);
        }

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
    }
}
