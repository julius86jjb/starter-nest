import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      delete user.password;

      return {
        user: user,
        // token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDbException(error)
    }
  }

  findAll() {
    return this.userRepository.find({})
  }

  async findOne(id: string) {
    const store = await  this.userRepository.findOneBy({id})
    if(!store)
        throw new NotFoundException(`Store with id: ${id} not found`)

    return store;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user);
  }

  // async checkAuthStatus(user: User) {
  //   return {
  //     ...user,
  //     token: this.getJwtToken({ id: user.id }),
  //   };
  // }

  // private getJwtToken(payload: JwtPayload) {
  //   const token = this.jwtService.sign(payload);
  //   return token;
  // }

  private handleDbException(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);

    throw new InternalServerErrorException(
      'Internal Server Error - Checks logs',
    );
  }
}
