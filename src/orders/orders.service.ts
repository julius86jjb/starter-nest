import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { HandleExceptionsService } from 'src/common/services/handle-exceptions.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {

  private readonly logger = new Logger('OrdersService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private handleExceptionsService: HandleExceptionsService
  ) { }

  async create(createOrderDto: CreateOrderDto, user: User) {
    try {
      const order = this.orderRepository.create({
        ...createOrderDto,
        buyer: user
      });
      await this.orderRepository.save(order);

      return order;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.orderRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let order: Order;

    if (isUUID(term))
      order = await this.orderRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.orderRepository.createQueryBuilder();
      order = await queryBuilder
        .where('UPPER(name) = :name or slug =:slug', {
          slug: term.toLowerCase(),
          name: term.toUpperCase(),
        })
        .getOne();
    }

    if (!order)
      throw new NotFoundException(`order with ${term} not found`);

    return order;
  }


  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id: id,
      ...updateOrderDto,
    });

    if (!order)
      throw new NotFoundException(`order with id: ${id} not found`);

    try {
      await this.orderRepository.save(order);

      return order;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return order;
  }

  async deleteAllOrders() {
    const query = this.orderRepository.createQueryBuilder('order')

    try {
      return await query
        .delete()
        .where({})
        .execute()
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }
}
