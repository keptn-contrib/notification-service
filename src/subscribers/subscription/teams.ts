import * as rp from 'request-promise-native';
import { ISubscription } from '../subscriber.type';
import { Notification } from '../../events/notification';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

export class Teams implements ISubscription {
  constructor(@Inject('winston') private readonly logger: Logger, private readonly url: string) {}

  public async send(notification: Notification): Promise<void> {
    try {
      const body = notification.getTeamsNotification();
      this.logger.debug('getTeamsNotification body: ' + JSON.stringify(body));

      const response = await rp(this.url, {
        method: 'POST',
        json: true,
        body,
      });
      this.logger.debug('getTeamsNotification ' + body.summary + ' response: ' + response);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
