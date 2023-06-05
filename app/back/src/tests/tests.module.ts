import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { Test, TestSchema } from 'src/db/schemas/Test.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]),
  ],
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule {}
