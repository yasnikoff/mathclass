import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { Assignment } from 'src/db/schemas/Assignment.schema';

@Controller('assignments')
export class AssignmentsController {
  constructor(private service: AssignmentsService) {}

  @Post()
  async create(@Body() body: Partial<Assignment>) {
    return this.service.create(body);
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }
  @Get('foruser/:userId')
  async getAllForUser(@Param() params) {
    return this.service.getAll(params?.userId);
  }

  @Get(':id')
  async getById(@Param() params) {
    return this.service.getById(params?.id);
  }
}
