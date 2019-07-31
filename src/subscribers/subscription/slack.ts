import { ISubscription } from '../subscriber.type';
import {
  IncomingWebhook,
  IncomingWebhookDefaultArguments,
} from '@slack/webhook';
import { Notification } from '../../events/notification';

export class Slack implements ISubscription {
  private readonly webhook: IncomingWebhook;

  constructor(url: string, defaults?: IncomingWebhookDefaultArguments) {
    this.webhook = new IncomingWebhook(url, defaults);
  }

  public async send(notification: Notification): Promise<void> {
    try {
      const response = await this.webhook.send(
        notification.getSlackNotification(),
      );
      // log
      console.log('getSlackNotification ' + notification.getSlackNotification().text + ' response: ' + response.text);
    } catch (err) {
      console.error(err);
    }
  }
}
