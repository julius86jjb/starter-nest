import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from '../users/auth/auth.module';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';


@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Order]),
    AuthModule,
  ]
})
export class OrdersModule {}
