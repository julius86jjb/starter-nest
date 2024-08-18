import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Auth } from '../users/auth/decorators/auth.decorator';
import { ValidRoles } from '../users/auth/interfaces/valid-roles.interface';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserGuard } from '../users/auth/guards/current-user.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  @Auth()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDto) {
    return this.questionsService.findAll(paginationDTO);
  }

  @Get(':term')
  @Auth(ValidRoles.admin)
  findOne(@Param('term') term: string) {
    return this.questionsService.findOne(term);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), CurrentUserGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.questionsService.remove(id);
  }
}
