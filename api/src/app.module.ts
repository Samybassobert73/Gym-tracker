import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ExercisesModule } from './exercises/exercises.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://database:27017/samybase'),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ExercisesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
