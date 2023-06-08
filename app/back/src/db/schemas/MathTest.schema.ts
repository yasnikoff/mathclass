import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Problem } from './Problem.schema';

export type TestDocument = HydratedDocument<Test>;

@Schema()
export class Test {
  @Prop()
  id: string;

  @Prop({ required: true })
  caption: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }] })
  problems: Problem[];
}

export const TestSchema = SchemaFactory.createForClass(Test);
