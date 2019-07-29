import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { CloudEvent, CloudEventType, NewArtifact, ConfigurationChanged, DeploymentFinished, TestsFinished, EvaluationDone, Problem } from '../@typings/cloud-events';
import { INotification } from './notification';
import { Notification } from './notification';
import { Logger } from 'winston';
import { SubscriberService } from '../subscribers/subscriber.service';
import { NewArtifactNotification } from './notification/new-artifact';
import { ConfigurationChangedNotification } from './notification/configuration-changed';
import { DeploymentFinishedNotification } from './notification/deployment-finished';
import { TestsFinishedNotification } from './notification/tests-finished';
import { EvaluationDoneNotification } from './notification/evaluation-done';
import { ProblemNotification } from './notification/problem';
@Controller()
export class EventsController {
  constructor(@Inject('winston') private readonly logger: Logger, 
  private readonly subscriberService: SubscriberService) {}

  @Post()
  @HttpCode(200)
  getEvent(@Body() cloudEvent: CloudEvent) {

    this.logger.debug('EventsController.getEvent() post received');
    this.logger.debug('EventsController.getEvent() payload: ' + JSON.stringify(cloudEvent));
    const message = this.createCloudEventServiceFactory(cloudEvent);
    const subscribers = this.subscriberService.getSubscribers();

    message.notify(subscribers);
  }

  private createCloudEventServiceFactory(
    cloudEvent: CloudEvent,
  ): INotification {
    if (
      Notification.isEvent<NewArtifact>(CloudEventType.NewArtifact, cloudEvent)
    ) {
      return new NewArtifactNotification(cloudEvent);
    }
    else if  (
      Notification.isEvent<ConfigurationChanged>(CloudEventType.ConfigurationChanged, cloudEvent)
    ) {
      return new ConfigurationChangedNotification(cloudEvent);
    }
    else if  (
      Notification.isEvent<DeploymentFinished>(CloudEventType.DeploymentFinished, cloudEvent)
    ) {
      return new DeploymentFinishedNotification(cloudEvent);
    }
    else if  (
      Notification.isEvent<TestsFinished>(CloudEventType.TestsFinished, cloudEvent)
    ) {
      return new TestsFinishedNotification(cloudEvent);
    }
    else if  (
      Notification.isEvent<EvaluationDone>(CloudEventType.EvaluationDone, cloudEvent)
    ) {
      return new EvaluationDoneNotification(cloudEvent);
    }
    else if  (
      Notification.isEvent<Problem>(CloudEventType.Problem, cloudEvent)
    ) {
      return new ProblemNotification(cloudEvent);
    }

    throw new HttpException(
      `Unknown event type: '${cloudEvent.type}'`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
