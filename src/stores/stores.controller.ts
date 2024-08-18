import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Auth } from '../users/auth/decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserGuard } from '../users/auth/guards/current-user.guard';
import { GetUser } from 'src/users/auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @Auth()
  create(@Body() createStoreDto: CreateStoreDto, @GetUser() user: User) {
    return this.storesService.create(createStoreDto, user);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDTO: PaginationDto) {
    return this.storesService.findAll(paginationDTO);
  }

  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
    return this.storesService.findOne(term);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.storesService.remove(id);
  }
}
