import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/utils';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, enum: ['Student', 'Teacher'] })
  role: UserRole;

  @Prop()
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
