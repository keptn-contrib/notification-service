import { Notification } from '../events/notification';

export interface ISubscription {
  send(notification: Notification): Promise<void>;
}
