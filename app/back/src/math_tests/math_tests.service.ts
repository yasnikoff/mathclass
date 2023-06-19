import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MathTest } from 'src/db/schemas/MathTest.schema';
import { ProblemId } from 'src/problems';
@Injectable()
export class MathTestsService {
  constructor(@InjectModel(MathTest.name) private testModel: Model<MathTest>) {}

  async create(caption: string, problems: ProblemId[]): Promise<MathTest> {
    const test = await this.testModel.create({ caption, problems });
    return test.save();
  }

  async getAll(): Promise<MathTest[]> {
    return (
      await this.testModel
        .find({}, { _id: 1, caption: 1, problems: 1 })
        .populate('problems')
    ).map((t) => ((t.id = t._id.toString()), t));
  }

  async getById(id: string): Promise<MathTest> {
    const item = await this.testModel.findById(id).populate('problems');
    if (item) {
      item.id = item._id.toString();
      delete item._id;
    }
    return item;
  }
}
