import { Module } from '@nestjs/common';
import { RequestsModule } from './requests/requests.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [RequestsModule, OrdersModule]
})
export class PrintModule {}
