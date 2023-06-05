import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProblemsModule } from './problems/problems.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { TestsModule } from './tests/tests.module';
import Joi = require('joi');

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProblemsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_CONNECTION_STRING: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    AssignmentsModule,
    TestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
