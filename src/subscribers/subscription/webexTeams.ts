import * as rp from 'request-promise-native';
import { ISubscription } from '../subscriber.type';
import { Logger } from 'winston';
import { Notification } from '../../events/notification';
import { Inject } from '@nestjs/common';

export class WebexTeams implements ISubscription {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly url: string,
  ) {}

  public async send(notification: Notification): Promise<void> {
    try {
      const body = notification.getWebexTeamsNotification();
      const response = await rp(this.url, {
        method: 'POST',
        json: true,
        resolveWithFullResponse: true,
        body,
      });
      this.logger.debug(
        'getWebexTeamsNotification ' +
          body +
          ' response: ' +
          response.statusCode,
      );
    } catch (err) {
      this.logger.error(err);
    }
  }
}
