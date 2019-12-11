import { Notification } from './index';
import { ConfigurationChanged } from '../../@typings/cloud-events';
import { stringify } from 'querystring';

export class ConfigurationChangedNotification extends Notification {
  constructor(configurationChanged: ConfigurationChanged ) {
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
        }
      ],
    };

    if (configurationChanged.data.labels) {
        this.defaultNotification.facts.push({
          name: "Labels",
          value: JSON.stringify(configurationChanged.data.labels)
        })      
    }

    if (configurationChanged.data.valuesCanary && configurationChanged.data.valuesCanary.image) {
      this.defaultNotification.facts.push({
        name: 'Image',
        value: configurationChanged.data.valuesCanary.image
      })
    }

    if (configurationChanged.data.canary.action) {
      var canaryAction = configurationChanged.data.canary.action
      if (configurationChanged.data.canary.value) {
        canaryAction += " value: " + configurationChanged.data.canary.value
      }
      this.defaultNotification.facts.push({
        name: 'Action',
        value: canaryAction
      })
    }
  }
}
