import { Notification } from './index';
import { NewArtefact } from '../../@typings/cloud-events';
import { IncomingWebhookSendArguments } from '@slack/webhook';

export class NewArtefactNotification extends Notification {
  constructor(private readonly newArtefact: NewArtefact) {
    super();
  }

  defaultNotification = {
    title: 'New Artefact',
    facts: [
      {
        name: 'Image',
        value: this.newArtefact.data.image,
      },
    ],
  };

  slackNotification: IncomingWebhookSendArguments = {
    text: "I've overriden the default notification",
  };
}
