import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MathTest } from './MathTest.schema';
import { User } from './User.schema';
import { Problem } from './Problem.schema';

export enum SolutionStatus {
  NEW = 'new',
  SUBMITTED = 'submitted',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

export type AssignmentItemDocument = HydratedDocument<AssignmentItem>;

@Schema()
export class AssignmentItem {
  @Prop()
  problem: Problem;

  @Prop()
  solution: string;

  @Prop()
  status: SolutionStatus;

  @Prop()
  mark: number;
}

export const AssignmentItemSchema =
  SchemaFactory.createForClass(AssignmentItem);

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema()
export class Assignment {

  @Prop()
  caption: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Test' })
  test: MathTest;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  student: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  teacher: User;

  @Prop({ type: [AssignmentItemSchema] })
  items: AssignmentItem[];

  @Prop({ enum: ['students_draft', 'submitted', 'checked'] })
  status: string;
}

export type NewAssignment = Omit<
  Assignment,
  '_id' | 'student' | 'items' | 'status'
> & { students: string[] };

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
