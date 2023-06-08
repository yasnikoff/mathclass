import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TestsService } from './mathTests.service';
import { ProblemId } from 'src/problems';

@Controller('tests')
export class TestsController {
  constructor(private service: TestsService) {}

  @Post()
  async create(@Body() body: { caption: string; problems: ProblemId[] }) {
    return this.service.create(body.caption, body.problems);
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param() params) {
    return this.service.getById(params?.id);
  }
}
