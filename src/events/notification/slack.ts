import { IncomingWebhookSendArguments } from '@slack/webhook';

export abstract class Slack {
  /**
   * Generates a Slack webhook payload
   */
  public abstract getSlackNotification(): IncomingWebhookSendArguments;

  public getDefaultResponse(text: string): IncomingWebhookSendArguments {
    const message = {
      text,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text,
          },
          accessory: {
            type: 'image',
            // TODO 
            image_url: "https://via.placeholder.com/150",
            alt_text: 'alt',
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              // TODO
              text: 'Keptn Context',
            },
          ],
        },
        {
          type: 'divider',
        },
      ],
    };
    return message;
  }
}
