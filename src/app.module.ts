import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','src', 'img'),
      serveRoot: '/img',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','src', 'style'),
      serveRoot: '/style',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
