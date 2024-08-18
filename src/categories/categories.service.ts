import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { isUUID } from 'class-validator';
import { HandleExceptionsService } from 'src/common/services/handle-exceptions.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger('DepartmentsService');

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private handleExceptionsService: HandleExceptionsService,
  ) {}

  
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create({
        ...createCategoryDto
      });
      console.log(category);
      await this.categoryRepository.save(category);

      return category;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.categoryRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let category: Category;

    if (isUUID(term))
      category = await this.categoryRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.categoryRepository.createQueryBuilder();
      category = await queryBuilder
        .where('UPPER(name) = :name or slug =:slug', {
          slug: term.toLowerCase(),
          name: term.toUpperCase(),
        })
        .getOne();
    }

    if (!category)
      throw new NotFoundException(`category with ${term} not found`);

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id: id,
      ...updateCategoryDto,
    });

    if (!category)
      throw new NotFoundException(`category with id: ${id} not found`);

    try {
      await this.categoryRepository.save(category);

      return category;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return category;
  }


  async deleteAllCats(){
    const query = this.categoryRepository.createQueryBuilder('categories')

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
