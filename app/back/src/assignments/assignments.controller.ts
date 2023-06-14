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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth';
import { Roles } from 'src/auth/decorators';
import { UserRole } from 'src/utils';
import { AssignmentsService } from './assignments.service';
import {
  AssignmentDocument,
  NewAssignment,
} from 'src/db/schemas/Assignment.schema';

@Controller('assignments')
@UseGuards(AuthGuard)
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
  @Roles(UserRole.Teacher)
  async create(@Body() data: NewAssignment) {
    return this.service.create(data);
  }

  @Put()
  async save(@Body() assignmnet: AssignmentDocument) {
    return this.service.save(assignmnet);
  }

  @Patch(':assignmentId/:solutionIndex')
  @Roles(UserRole.Student)
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

  @Put('marks/:assignmentId/:solutionIndex/:mark')
  @Roles(UserRole.Teacher)
  async setMark(
    @Param('assignmentId') assignmentId,
    @Param('solutionIndex', ParseIntPipe) solutionIndex,
    @Param('mark') mark,
  ) {
    return this.service.setMark(assignmentId, solutionIndex, parseInt(mark));
  }
}
