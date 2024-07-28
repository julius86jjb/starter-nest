import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';


@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Order])
  ]
})
export class OrdersModule {}
