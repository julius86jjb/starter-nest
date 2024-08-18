import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './auth/dto/update-user.dto';
import { UsersService } from './users.service';
import { CurrentUserGuard } from './auth/guards/current-user.guard';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from './auth/interfaces/valid-roles.interface';
import { Auth } from './auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  @Auth(ValidRoles.admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
