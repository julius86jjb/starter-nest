import * as bcrypt from "bcrypt";
import { Repository } from 'typeorm';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './interfaces/login-response.interface';
import { RegisterResponse } from './interfaces/register-response.interface';
import { HandleExceptionsService } from '../../common/services/handle-exceptions.service';


@Injectable()
export class AuthService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private handleExceptionsService: HandleExceptionsService,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<RegisterResponse> {
    try {

      const { password, ...userData } = createUserDto;


      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      delete user.password;

      return {
        user: user,
        token: this.getJwtToken({ id: user.id })
      }

    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error)
    }
  }



  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    })

    if (!user)
      throw new UnauthorizedException(`Not valid credentials`)

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Not valid credentials`)


    return {
      user,
      token: this.getJwtToken({ id: user.id })
    };
  }



  async checkAuthStatus(user: User) {

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }



}
