import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidRoles } from 'src/users/auth/interfaces/valid-roles.interface';
import { Auth } from '../users/auth/decorators/auth.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/users/auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @Auth()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User
  ) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(
    @Query() paginationDTO: PaginationDto,
  ) {
    return this.ordersService.findAll(paginationDTO);
  }

  @Get(':term')
  @Auth(ValidRoles.admin)
  findOne(@Param('term') term: string) {
    return this.ordersService.findOne(term);
  }


  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.partner)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.remove(id);
  }
}
