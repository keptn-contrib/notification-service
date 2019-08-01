import { ISubscription } from '../subscriber.type';
import { Logger } from 'winston';
import {
  IncomingWebhook,
  IncomingWebhookDefaultArguments,
} from '@slack/webhook';
import { Notification } from '../../events/notification';
import { Inject } from '@nestjs/common';

export class Slack implements ISubscription {
  private readonly webhook: IncomingWebhook;

  constructor(@Inject('winston') private readonly logger: Logger,
    url: string, defaults?: IncomingWebhookDefaultArguments) {
    this.webhook = new IncomingWebhook(url, defaults);
  }

  public async send(notification: Notification): Promise<void> {
    try {
      const response = await this.webhook.send(
        notification.getSlackNotification(),
      );
      this.logger.debug('getSlackNotification ' + notification.getSlackNotification().text + ' response: ' + response.text);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
