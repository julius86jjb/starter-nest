import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { HandleExceptionsService } from 'src/common/services/handle-exceptions.service';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger('DepartmentsService');

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private handleExceptionsService: HandleExceptionsService,
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto) {

    try {
      const { categories = [], ...departmentDetails } = createDepartmentDto;
      const department = this.departmentRepository.create({
        ...departmentDetails,
        categories: categories.map((category) => this.categoryRepository.create({
          name: category.name,
          department_title: category.department_title,
          img: category.img ? category.img : null,
          inventory: category.inventory ? category.inventory : 0,
          views:category.views ? category.views : 0,
        }))
      })
      await this.departmentRepository.save(department);

      return department;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(paginationDTO: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDTO;

    return this.departmentRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let department: Department;

    if (isUUID(term))
      department = await this.departmentRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.departmentRepository.createQueryBuilder();
      department = await queryBuilder
        .where('UPPER(name) = :name or slug =:slug', {
          slug: term.toLowerCase(),
          name: term.toUpperCase(),
        })
        .getOne();
    }

    if (!department)
      throw new NotFoundException(`Department with ${term} not found`);

    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.departmentRepository.preload({
      id: id,
      ...updateDepartmentDto,
      categories: [],
    });

    if (!department)
      throw new NotFoundException(`Department with id: ${id} not found`);

    try {
      await this.departmentRepository.save(department);

      return department;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const deparment = await this.findOne(id);
    await this.departmentRepository.remove(deparment);
    return deparment;
  }



  async deleteAllProducts() {
    const query = this.departmentRepository.createQueryBuilder('department')

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
