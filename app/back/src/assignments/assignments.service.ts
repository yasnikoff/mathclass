import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Assignment,
  AssignmentDocument,
  NewAssignment,
  AssignmentItemSchema,
} from 'src/db/schemas/Assignment.schema';
import { MathTestsService } from 'src/math_tests/math_tests.service';
import { UserRole } from 'src/utils';
import { AssignmentStatus } from '.';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
    private testService: MathTestsService,
  ) {}

  async getAll(userId?: string): Promise<Partial<Assignment>[]> {
    // const projection = { _id: 1, caption: 1, student: 1, status: 1 };

    const query = userId ? { student: userId } : {};
    const results = await this.assignmentModel
      .find(query)
      .populate({ path: 'student', select: 'username _id' })
      .populate({ path: 'teacher', select: 'username _id' });
    // .populate({ path: 'test', populate: { path: 'problems' } });

    return results;
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
    const AssignmentItemModel = mongoose.model(
      'AssignmentItemModel',
      AssignmentItemSchema,
    );
    const test = await this.testService.getById(data.test);
    if (!test) {
      throw new Error(`test with id ${data.test} not found`);
    }
    const items = test.problems.map((problem) => {
      const item = new AssignmentItemModel({
        problem,
        solution: '',
        mark: 0,
        status: AssignmentStatus.STUDENTS_DRAFT,
      });
      return item;
    });

    const newAssignments = unassignedStudents.map((student) => ({
      ...data,
      student,
      items,
      status: AssignmentStatus.STUDENTS_DRAFT,
    }));
    return await this.assignmentModel.insertMany(newAssignments);
  }

  async save(assignment: AssignmentDocument) {
    return this.assignmentModel.findByIdAndUpdate(assignment._id, assignment);
  }

  async saveSolution(
    assignmentId: string,
    problemIndex: number,
    solution: string,
  ) {
    const assignment = await this.assignmentModel.findById(assignmentId);
    const assignmentItem = assignment && assignment.items[problemIndex];
    if (assignmentItem) {
      if (assignmentItem.status != AssignmentStatus.STUDENTS_DRAFT) {
        throw new HttpException(
          `Solution is already submitted for check`,
          HttpStatus.FORBIDDEN,
        );
      }
      assignmentItem.solution = solution;
      assignmentItem.mark = 0;
      return await assignment.save();
    }
  }

  async submitAssignment(assignmentId: string) {
    const assignment = await this.assignmentModel.findById(assignmentId, {
      status: 1,
    });
    if (!assignment) {
      throw new HttpException(`No assignment found`, HttpStatus.NOT_FOUND);
    }
    if (
      assignment?.status &&
      assignment.status !== AssignmentStatus.STUDENTS_DRAFT
    ) {
      throw new HttpException(
        `Only student draft can be submitted`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.assignmentModel.findByIdAndUpdate(assignmentId, {
      status: AssignmentStatus.SUBMITTED,
    });
  }

  async setMark(assignmentId: string, problemIndex: number, mark: number) {
    const assignment = await this.assignmentModel.findById(assignmentId);
    const assignmentItem = assignment && assignment.items[problemIndex];
    if (assignmentItem) {
      assignmentItem.mark = mark;
      assignmentItem.status = AssignmentStatus.CHECKED;
      return await assignment.save();
    }
  }
}
