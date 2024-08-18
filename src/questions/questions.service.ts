import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HandleExceptionsService } from 'src/common/services/handle-exceptions.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class QuestionsService {
  private readonly logger = new Logger('DepartmentsService');

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private handleExceptionsService: HandleExceptionsService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const question = this.questionRepository.create({
        ...createQuestionDto,
      });
      await this.questionRepository.save(question);

      return question;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.questionRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let question: Question;

    if (isUUID(term))
      question = await this.questionRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.questionRepository.createQueryBuilder();
      question = await queryBuilder
        .where('UPPER(name) = :name or slug =:slug', {
          slug: term.toLowerCase(),
          name: term.toUpperCase(),
        })
        .getOne();
    }

    if (!question)
      throw new NotFoundException(`question with ${term} not found`);

    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.preload({
      id: id,
      ...updateQuestionDto,
    });

    if (!question)
      throw new NotFoundException(`question with id: ${id} not found`);

    try {
      await this.questionRepository.save(question);

      return question;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
    return question;
  }

  async deleteAllQuestions(){
    const query = this.questionRepository.createQueryBuilder('question')

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
