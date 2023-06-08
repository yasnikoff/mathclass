import { Injectable } from '@nestjs/common';
import mocks from './data/mocks';
import { Problem as ProblemDto } from './problem';
import { fromData, Data } from 'src/utils';
import { ProblemId } from '.';
import { InjectModel } from '@nestjs/mongoose';
import { Problem } from 'src/db/schemas/Problem.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProblemsService {
  private problems: ProblemDto[] = [];
  constructor(@InjectModel(Problem.name) private problemModel: Model<Problem>) {
    this.problems = mocks.map((data) => fromData(ProblemDto, data));
  }

  async getLastProblems(): Promise<Problem[]> {
    return (await this.problemModel.find().sort({ createdAt: -1 }).exec()).map(
      (problem) => ({ id: problem._id.toString(), math: problem.math }),
    );
  }

  async findProblemById(id: string) {
    const problem = await this.problemModel.findById(id);
    return problem;
  }

  async createProblem(createProblemDto: Data<ProblemDto>): Promise<ProblemDto> {
    const data = { math: createProblemDto.math };
    const createdProblem = new this.problemModel(data);
    const savedProblem = await createdProblem.save();
    return { id: savedProblem._id.toString(), math: savedProblem.math };
  }

  async deleteProblem(id: ProblemId) {
    this.problemModel.deleteOne({ id });
    return { id };
  }

  async deleteMany(ids: ProblemId[]) {
    await this.problemModel.deleteMany({ _id: { $in: ids } });
    return ids;
  }
}
