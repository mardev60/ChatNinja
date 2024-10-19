import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://makiluspn:B5U8Y6Tal4N7iwWh@cluster0.qsb68.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}