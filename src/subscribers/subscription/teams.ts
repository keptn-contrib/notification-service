import * as rp from 'request-promise-native';
import { ISubscription } from '../subscriber.type';
import { Notification } from '../../events/notification';

export class Teams implements ISubscription {
  constructor(private readonly url: string) {}

  public async send(notification: Notification): Promise<void> {
    try {
      const body = notification.getTeamsNotification();
      console.log(JSON.stringify(body))
      const response = await rp(this.url, {
        method: 'POST',
        json: true,
        body,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
}
