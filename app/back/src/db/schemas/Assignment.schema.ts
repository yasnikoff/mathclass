import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Test } from './MathTest.schema';
import { User } from './User.schema';
import { Solution } from './Solution.schema';

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema()
export class Assignment {
  @Prop()
  _id: string;

  @Prop()
  caption: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Test' })
  test: Test;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  student: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  teacher: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }] })
  solutions: Solution[];

  @Prop({ enum: ['students_draft', 'submitted', 'checked'] })
  status: string;
}

export type NewAssignment = Omit<
  Assignment,
  '_id' | 'student' | 'solutions' | 'status'
> & { students: string[] };

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
