import { Notification } from './index';
import { ConfigurationChanged } from '../../@typings/cloud-events';

export class ConfigurationChangedNotification extends Notification {
  constructor(configurationChanged: ConfigurationChanged) {
    super(configurationChanged);
  
    this.defaultNotification = {
      title: 'CONFIGURATION CHANGED',
      facts: [
        { 
          name: 'Project',
          value: configurationChanged.data.project
        },
        { 
          name: 'Stage',
          value: configurationChanged.data.stage
        },
        { 
          name: 'Service',
          value: configurationChanged.data.service
        },
        {
          name: 'Image',
          value: configurationChanged.data.image + ":" + configurationChanged.data.tag
        },
        { 
          name: 'Deployment Strategy',
          value: configurationChanged.data.deploymentstrategy
        }
      ],
    };

    if (configurationChanged.data.teststrategy) {
      this.defaultNotification.facts.push({
        name: 'Test Strategy',
        value: configurationChanged.data.teststrategy
      })
    }

  }
}