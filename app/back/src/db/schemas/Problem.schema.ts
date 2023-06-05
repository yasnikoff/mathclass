import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProblemDocument = HydratedDocument<Problem>;

@Schema()
export class Problem {
  @Prop()
  id: string;

  @Prop({ required: true })
  math: string;
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);
