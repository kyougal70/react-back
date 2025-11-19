import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.getHttpAdapter().getInstance().set('trust proxy', 1);
  await app.listen(3001);
}
bootstrap();
