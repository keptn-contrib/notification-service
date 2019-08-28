import { ISubscription } from '../../subscribers/subscriber.type';
import { IncomingWebhookSendArguments } from '@slack/webhook';
import { IMessageCard } from '../../@typings/message-card';
import { CloudEvent } from "../../@typings/cloud-events";

export interface INotification {
  notify(subscriptions: ISubscription[]): Promise<void>;
}

export interface IDefaultNotification {
  title: string;
  facts: Array<{ name: string; value: string }>;
  image?: string;
  teamsThemeColor?: string;
  slackEmoji?: string;
}

export abstract class Notification implements INotification {
  public readonly context: string;

  public constructor(event: CloudEvent) {
    this.context = event.shkeptncontext;
  }
  /**
   * A type guard that can be used to add typing to a CloudEvent. It's working
   * under the assumption that if the event name passes, the rest of the event
   * is valid.
   * @param eventName - The name of the event.
   * @param event - The event itself.
   */
  public static isEvent<T extends { type: string }>(
    eventName: string,
    event: { type: string },
  ): event is T {
    return (event as T).type === eventName;
  }

  protected defaultNotification: IDefaultNotification;
  protected slackNotification?: IncomingWebhookSendArguments;
  protected teamsNotification?: IMessageCard;

  /**
   * Sends notifications all the subscribers.
   *
   * @param subscriptions - An array of subscribers to the notification
   */
  public async notify(subscriptions: ISubscription[]): Promise<void> {
    subscriptions.forEach(s => s.send(this));
  }

  /**
   * Generates a Slack webhook payload
   */
  public getSlackNotification(): IncomingWebhookSendArguments {
    if (!this.slackNotification) {
      if (!this.defaultNotification) {
        // TODO
        throw new Error('MISSING');
      }

      // TODO update once https://github.com/slackapi/node-slack-sdk/pull/807 is available
      // https://api.slack.com/reference/messaging/blocks
      const message: any = {
        text: this.defaultNotification.title,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*' + this.defaultNotification.title + '*',
            },
          },
          {
            type: 'section',
            fields: this.defaultNotification.facts.map(f => ({
              type: 'mrkdwn',
              text: `*${f.name}*: ${this.formatForSlack(f.name, this.sanitizeValue(f.value)) }`,
            })),
            accessory: this.defaultNotification.image
              ? {
                type: 'image',
                image_url: this.defaultNotification.image,
                alt_text: 'Keptn',
              }
              : undefined,
          },
          {
            type: 'context',
            elements: [
              {
                "type": "mrkdwn",
                "text": `Keptn Context: ${this.context}`
              }
            ]
          }
        ],
      };
      return message;
    }
    return this.slackNotification;
  }

  /**
   * Generates a Teams webhook payload.
   */
  public getTeamsNotification(): IMessageCard {
    if (!this.teamsNotification) {
      if (!this.defaultNotification) {
        // TODO
        throw new Error('MISSING');
      }

      const message: IMessageCard = {
        '@type': 'MessageCard',
        '@context': 'https://schema.org/extensions',
        summary: this.defaultNotification.title,
        title: this.defaultNotification.title,
        themeColor: this.defaultNotification.teamsThemeColor,
        sections: [
          {
            facts: this.defaultNotification.facts.map(f => ({
              name: `${f.name}:`,
              value: this.sanitizeValue(f.value),
            })),
          },
          {
            activitySubtitle: `Keptn Context: ${this.context}`,
          }
        ],
        potentialAction: [],
      };
      return message;
    }
    return this.teamsNotification;
  }

  private sanitizeValue(value: string): string {
    // do this so that null values can still be displayed
    if (typeof value == 'string') {
      return value.replace(/_/g, ' ');
    }
    return value;
  }

  private formatForSlack(key: string, value: string): string {
    // replace teams formatting for bold formatting and emojis
    value = value.replace(/<BR>/gi, '\n');
    value = value.replace(/\*\*/g, '*');

    // add markup formatting for all values except results
    // because the formatting in this value field has formatting
    // that will not render properly with markup tags
    if (!key.startsWith('Indicator Results')) {
      value = "`" + value + "`"
    }

    // add the closure markup tag too so emojis renders
    // replacement assumed emoji is at the end of the line
    value = value.replace(/&#x1F44D;`/g, '`:thumbsup:');
    value = value.replace(/&#x26D4;`/g, '`:no_entry:');

    // slack has 2000 character message limit and wont show if longer
    if (value.length > 2000) {
      value = value.substring(1,1990) + "...(more)..."
    }
    return value;
  }
}
