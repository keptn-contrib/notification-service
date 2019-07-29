import { Notification, IDefaultNotification } from './index';
import { ConfigurationChanged } from '../../@typings/cloud-events';

export class ConfigurationChangedNotification extends Notification {
  constructor(private readonly configurationChanged: ConfigurationChanged) {
    super();
  }

  defaultNotification: IDefaultNotification = {
    title: 'CONFIGURATION CHANGED',
    facts: [
      { 
        name: 'Project',
        value: this.configurationChanged.data.project
      },
      { 
        name: 'Stage',
        value: this.configurationChanged.data.stage
      },
      { 
        name: 'Service',
        value: this.configurationChanged.data.service
      },
      {
        name: 'Image',
        value: this.configurationChanged.data.image
      },
      { 
        name: 'Tag',
        value: this.configurationChanged.data.tag
      },
      { 
        name: 'Deployment Stategy',
        value: this.configurationChanged.data.deploymentstrategy
      },
      { 
        name: 'Test Strategy',
        value: this.configurationChanged.data.teststrategy
      },
      {
        name: 'Keptn context',
        value: this.configurationChanged.shkeptncontext
      }
    ],
  };
}