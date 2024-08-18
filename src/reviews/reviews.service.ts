import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { HandleExceptionsService } from 'src/common/services/handle-exceptions.service';

@Injectable()
export class ReviewsService {



  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private handleExceptionsService: HandleExceptionsService
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = this.reviewRepository.create({
        ...createReviewDto
      });
      await this.reviewRepository.save(review);

      return review;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.reviewRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let review: Review;

    if (isUUID(term))
      review = await this.reviewRepository.findOneBy({ id: term });
    else {
      const queryBuilder = this.reviewRepository.createQueryBuilder();
      review = await queryBuilder
        .where('UPPER(name) = :name or slug =:slug', {
          slug: term.toLowerCase(),
          name: term.toUpperCase(),
        })
        .getOne();
    }

    if (!review)
      throw new NotFoundException(`review with ${term} not found`);

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.preload({
      id: id,
      ...updateReviewDto,
    });

    if (!review)
      throw new NotFoundException(`review with id: ${id} not found`);

    try {
      await this.reviewRepository.save(review);

      return review;
    } catch (error) {
      this.handleExceptionsService.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const review = await this.findOne(id);
    await this.reviewRepository.remove(review);
    return review;
  }

  async deleteAllReviews(){
    const query = this.reviewRepository.createQueryBuilder('review')

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
