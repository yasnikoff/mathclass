import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from 'src/db/schemas/Test.schema';
import { ProblemId } from 'src/problems';
@Injectable()
export class TestsService {
  constructor(@InjectModel(Test.name) private testModel: Model<Test>) {}

  async create(caption: string, problems: ProblemId[]): Promise<Test> {
    const test = await this.testModel.create({ caption, problems });
    return test.save();
  }

  async getAll(): Promise<Test[]> {
    return (
      await this.testModel.find({}, { _id: 1, caption: 1, problems: 1 })
    ).map((t) => ((t.id = t._id.toString()), t));
  }
  async getById(id: string): Promise<Test> {
    const item = await this.testModel.findById(id);
    if (item) {
      item.id = item._id.toString();
      delete item._id;
    }
    return item;
  }
}
