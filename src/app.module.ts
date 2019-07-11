import { Module } from '@nestjs/common';
import { EventsController } from './events/events.controller';
import { SubscriberService } from './subscribers/subscriber.service';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: process.env.LOG_LEVEL || 'debug',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    }),
    ConfigModule.load(resolve(__dirname, 'config', '**', '!(*.d).{ts,js}' )),
  ],
  controllers: [EventsController],
  providers: [SubscriberService],
})
export class AppModule {}
