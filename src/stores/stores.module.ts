import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Order])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
