import { Controller, Post, Body, Get } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../entities/user.entity";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { GetUser } from "./decorators/get-user.decorator";
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User,) {
    return this.authService.checkAuthStatus(user);
  }
}