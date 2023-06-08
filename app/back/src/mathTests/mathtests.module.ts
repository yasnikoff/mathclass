import { Module } from '@nestjs/common';
import { TestsService } from './mathTests.service';
import { TestsController } from './mathTests.controller';
import { Test, TestSchema } from 'src/db/schemas/MathTest.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]),
  ],
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule {}
