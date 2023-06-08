import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from 'src/db/schemas/Assignment.schema';
import { Problem } from 'src/db/schemas/Problem.schema';
import { ProblemId } from 'src/problems';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
  ) {}

  async create(dto: Omit<Assignment, 'id'>): Promise<Assignment> {
    const assignemt = await this.assignmentModel.create(dto);
    return assignemt.save();
  }

  async getAll(userId?: string): Promise<Partial<Assignment>[]> {
    const projection = { _id: 1, caption: 1, student: 1, status: 1 };
    if (userId) {
      return this.assignmentModel.find({ student: userId }, projection);
    }
    return this.assignmentModel.find({}, projection);
  }

  async getById(id: string): Promise<Assignment> {
    return this.assignmentModel.findById(id);
  }
}
