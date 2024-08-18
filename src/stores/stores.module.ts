import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { Order } from 'src/orders/entities/order.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/users/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, Order]),
    CommonModule,
    AuthModule
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService]
})
export class StoresModule { }
