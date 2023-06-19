import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment, AssignmentSchema } from 'src/db/schemas/Assignment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MathTestsModule } from 'src/mathTests/mathTests.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MathTestsModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Assignment.name, schema: AssignmentSchema },
    ]),
  ],
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
})
export class AssignmentsModule {}
