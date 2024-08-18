import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Auth } from '../users/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/users/auth/interfaces/valid-roles.interface';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserGuard } from '../users/auth/guards/current-user.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Auth()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDto) {
    return this.reviewsService.findAll(paginationDTO);
  }

  @Get(':term')
  @Auth(ValidRoles.admin)
  findOne(@Param('term') term: string) {
    return this.reviewsService.findOne(term);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.remove(id);
  }
}
