import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CloudEvent, CloudEventType, NewArtefact } from '../@typings/cloud-events';
import { INotification } from './notification';
import { Notification } from './notification';
import { NewArtefactNotification } from './notification/new-artefact';
import { SubscriberService } from '../subscribers/subscriber.service';

@Controller()
export class EventsController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  @HttpCode(200)
  getEvent(@Body() cloudEvent: CloudEvent) {
    const message = this.createCloudEventServiceFactory(cloudEvent);
    const subscribers = this.subscriberService.getSubscribers();

    message.notify(subscribers);
  }

  private createCloudEventServiceFactory(
    cloudEvent: CloudEvent,
  ): INotification {
    if (
      Notification.isEvent<NewArtefact>(CloudEventType.NewArtefact, cloudEvent)
    ) {
      return new NewArtefactNotification(cloudEvent);
    }

    throw new HttpException(
      `Unknown event type: '${cloudEvent.type}'`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
