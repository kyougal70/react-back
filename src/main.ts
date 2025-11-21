import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Inject raw body for signature verification (FingerprintJS webhook only)
  app.use(
    '/webhook/fingerprint',
    bodyParser.raw({
      type: '/', // Make sure it doesn't get parsed before we handle it
      verify: (req: any, res, buf: Buffer) => {
        req.rawBody = buf;
      },
    }),
  );

  // For all other routes use normal JSON parser
  app.use(json());

  // ✅ Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  const port = 3001;
  console.log('port', port);
  await app.listen(port);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
