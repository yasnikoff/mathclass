import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import {
  AssignmentDocument,
  NewAssignment,
} from 'src/db/schemas/Assignment.schema';

@Controller('assignments')
export class AssignmentsController {
  constructor(private service: AssignmentsService) {}

  @Get()
  async getAll(@Query('student') studentId) {
    return this.service.getAll(studentId || undefined);
  }

  @Get(':id')
  async getById(@Param() params) {
    return this.service.getById(params?.id);
  }

  @Post()
  async create(@Body() data: NewAssignment) {
    return this.service.create(data);
  }

  @Put()
  async save(@Body() assignmnet: AssignmentDocument) {
    return this.service.save(assignmnet);
  }

  @Patch(':assignmentId/:solutionIndex')
  async saveSolution(
    @Param('assignmentId') assignmentId,
    @Param('solutionIndex', ParseIntPipe) solutionIndex,
    @Body() solution,
  ) {
    return this.service.saveSolution(
      assignmentId,
      solutionIndex,
      solution.math,
    );
  }
}
