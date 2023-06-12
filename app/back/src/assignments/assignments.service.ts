import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment, NewAssignment } from 'src/db/schemas/Assignment.schema';
import { UserRole } from 'src/utils';

import { AssignmentStatus } from '.';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
  ) {}

  async getAll(userId?: string): Promise<Partial<Assignment>[]> {
    const projection = { _id: 1, caption: 1, student: 1, status: 1 };
    let results;
    if (userId) {
      results = this.assignmentModel.find({ student: userId }, projection);
    } else {
      results = this.assignmentModel.find({}, projection);
    }
    return await results
      .populate('student')
      .populate('teacher')
      .populate({ path: 'test', populate: { path: 'problems' } });

    // .populate('solutions');
  }

  async getById(id: string): Promise<Assignment> {
    return this.assignmentModel.findById(id);
  }

  async getByTestId(testId: string) {
    return this.assignmentModel.find({ test: testId });
  }

  async create(data: NewAssignment): Promise<Assignment[]> {
    const assignedStudents = await this.assignmentModel
      .find(
        { student: { $in: data.students }, role: UserRole.Student },
        { student: 1 },
      )
      .exec();

    const unassignedStudents = data.students.filter(
      (studentId) =>
        !assignedStudents.some(
          (assignedStudent) => assignedStudent.student.id === studentId,
        ),
    );
    delete data.students;
    const newAssignments = unassignedStudents.map((student) => ({
      ...data,
      student,
      status: AssignmentStatus.STUDENTS_DRAFT,
      solutions: [],
    }));
    return await this.assignmentModel.insertMany(newAssignments);
  }
}
