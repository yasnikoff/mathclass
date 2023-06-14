import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProblemId } from '.';
import { Roles } from 'src/auth/decorators';
import { UserRole } from 'src/utils';

@UseGuards(AuthGuard)
@Controller('problems')
export class ProblemsController {
  constructor(private service: ProblemsService) {}

  @Get()
  async getLastProblems() {
    return this.service.getLastProblems();
  }

  @Delete()
  @Roles(UserRole.Teacher)
  async deleteMany(@Body() body: ProblemId[]) {
    this.service.deleteMany(body);
  }

  @Post()
  @Roles(UserRole.Teacher)
  async createProblem(@Body() body) {
    return this.service.createProblem(body);
  }

  @Get(':id')
  async getProblem(@Param() params: { id: ProblemId }) {
    return this.service.findProblemById(params?.id);
  }

  @Delete(':id')
  async deleteProblem(@Param() params: { id: ProblemId }) {
    this.service.deleteProblem(params?.id);
  }
}
