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

@UseGuards(AuthGuard)
@Controller('problems')
export class ProblemsController {
  constructor(private service: ProblemsService) {}

  @Get()
  async getLastProblems() {
    return this.service.getLastProblems();
  }

  @Delete()
  async deleteMany(@Body() body: ProblemId[]) {
    this.service.deleteMany(body);
  }

  @Post()
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
