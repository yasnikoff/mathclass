import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Test } from './MathTest.schema';
import { User } from './User.schema';
import { Solution } from './Solution.schema';

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema()
export class Assignment {
  @Prop()
  id: string;

  @Prop()
  caption: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Test' })
  test: Test;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  student: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }] })
  solutions: Solution[];

  @Prop({ enum: ['sent', 'completed', 'checked'] })
  status: string;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
