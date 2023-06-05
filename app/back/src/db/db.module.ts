import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule],
  providers: [DbService],
})
export class DbModule {}
