import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Order, OrderDocument} from "./schemas/order.schema";
import {Model, Types} from "mongoose";
import {DocumentType} from "../requests/enums/enum";
import {PaginationDto} from "../../../common/dtos/pagination.dto";

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDocument>,
    ) {}

    private prefixMap = {
        [DocumentType.PASSPORT]: 'PSP',
        [DocumentType.DNI]: 'DNI',
        [DocumentType.ACCREDITATION]: 'ADC',
    };


    async findAll(dto: PaginationDto):Promise<{
        orders: OrderDocument[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {

        try {
            const { page, limit } = dto;
            const skip = (page - 1) * limit;

            const orders = await this.orderModel
            .find()
            .populate('requests')
            .skip(skip)
            .limit(limit)
            .exec();

            const total = await this.orderModel.countDocuments().exec();

            return {
                orders,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw new InternalServerErrorException('Error finding orders');
        }

    }

    async findOne(id: string): Promise<OrderDocument> {
        const order  = await this.orderModel.findById(id).populate('requests').exec();

        if (!order) {
            throw new InternalServerErrorException('Order not found');
        }
        return order;
    }

    // update(id: number, updateOrderDto: any) {
    //     return `This action updates a #${id} order`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} order`;
    // }

    async selectAvailableOrder(documentType: DocumentType): Promise<OrderDocument> {
        let order = await this.findAvailableOrder(documentType);

        if (!order) {
            order = await this.createOrder(documentType);
        }
        return order;
    }

    private async findAvailableOrder(documentType: DocumentType): Promise<OrderDocument | null> {
        return this.orderModel
        .findOne({
            documentType,
            $expr: { $lt: [{ $size: '$requests' }, 2] },
        })
        .sort({ createdAt: -1 })
        .exec();
    }

    private async createOrder(documentType: DocumentType): Promise<OrderDocument> {
        const code = await this.generateOrderCode(documentType);
        const order = new this.orderModel({
            documentType,
            createdAt: new Date(),
            code,
            requests: [],
        });
        return order.save();
    }

    async addRequestToOrder(order: OrderDocument, requestId: Types.ObjectId): Promise<void> {
        order.requests.push(requestId);
        await order.save();
    }

    async findLastOrderOfToday(documentType: DocumentType): Promise<OrderDocument | null> {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        return this.orderModel
        .findOne({
            documentType,
            createdAt: { $gte: todayStart, $lte: todayEnd },
        })
        .sort({ createdAt: -1 })
        .exec();
    }


    private async generateOrderCode(documentType: DocumentType): Promise<string> {
        const prefix = this.prefixMap[documentType];
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        const lastOrder = await this.findLastOrderOfToday(documentType);

        let counter = 1;
        if (lastOrder?.code) {
            const lastCounterStr = lastOrder.code.split('-')[1];
            if (lastCounterStr) {
                counter = parseInt(lastCounterStr, 10) + 1;
            }
        }

        return `${prefix}${dateStr}-${counter.toString().padStart(3, '0')}`;
    }


}
