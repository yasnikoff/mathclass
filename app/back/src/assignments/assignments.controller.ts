import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { Assignment, NewAssignment } from 'src/db/schemas/Assignment.schema';

@Controller('assignments')
export class AssignmentsController {
  constructor(private service: AssignmentsService) {}

  @Get()
  async getAll(@Query('student') studentId) {
    console.log(studentId)
    return this.service.getAll(studentId || undefined);
  }
  @Get('foruser/:userId')
  async getAllForUser(@Param() params) {
    return this.service.getAll(params?.userId);
  }

  @Get(':id')
  async getById(@Param() params) {
    return this.service.getById(params?.id);
  }

  @Post()
  async create(@Body() data: NewAssignment) {
    return this.service.create(data);
  }
}
