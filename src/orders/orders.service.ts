import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { HandleExceptionsService } from 'src/common/services/handle-exceptions.service';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger('OrdersService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private handleExceptionsService: HandleExceptionsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const order = this.orderRepository.create(createOrderDto);
      await this.orderRepository.save(order);

      return order;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
