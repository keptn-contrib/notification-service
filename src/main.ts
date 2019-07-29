import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { json } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: true,
    bodyParser: false,
  });
  app.use(json({ type: ['application/json', 'application/cloudevents+json'] }));
  await app.listen(8080);
}
bootstrap();