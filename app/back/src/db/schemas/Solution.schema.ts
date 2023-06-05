import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './User.schema';
import { Problem } from './Problem.schema';

export type SolutionDocument = HydratedDocument<Solution>;

@Schema()
export class Solution {
  @Prop()
  id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true,
  })
  problem: Problem;

  @Prop({ required: true })
  math: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
