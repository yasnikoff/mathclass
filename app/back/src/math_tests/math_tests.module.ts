import { Module } from '@nestjs/common';
import { MathTestsService } from './math_tests.service';
import { TestsController } from './math_tests.controller';
import { MathTest, TestSchema } from 'src/db/schemas/MathTest.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: MathTest.name, schema: TestSchema }]),
  ],
  providers: [MathTestsService],
  controllers: [TestsController],
  exports: [MathTestsService],
})
export class MathTestsModule {}
