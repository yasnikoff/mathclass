import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProblemsModule } from './problems/problems.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { MathTestsModule } from './mathTests/mathtests.module';
import Joi = require('joi');

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProblemsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_CONNECTION_STRING: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    AssignmentsModule,
    MathTestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
