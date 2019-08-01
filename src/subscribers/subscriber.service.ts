import { Injectable, Inject } from '@nestjs/common';
import { ISubscription } from './subscriber.type';
import { Logger } from 'winston';

import { Slack } from './subscription/slack';
import { Teams } from './subscription/teams';
import { InjectConfig, ConfigService } from 'nestjs-config';

@Injectable()
export class SubscriberService {
  private readonly subscribers: ISubscription[] = [];

  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectConfig() private readonly config: ConfigService,
  ) {
    this.logger.debug('SubscriberService constructor. Loading subscribers');

    const slackUrl = this.config.get('url.slack');
    this.logger.info(`The slack URL is ${slackUrl}`);
    if (slackUrl) {
      this.subscribers.push(new Slack(logger, slackUrl));
    }

    const teamsUrl = this.config.get('url.teams');
    this.logger.info(`The teams URL is ${teamsUrl}`);
    if (teamsUrl) {
      this.subscribers.push(new Teams(logger, teamsUrl));
    }

    this.logger.debug(`SubscriberService constructor. Finished loading ${this.subscribers.length} subscribers`);
  }

  getSubscribers(): ISubscription[] {
    return this.subscribers;
  }
}
