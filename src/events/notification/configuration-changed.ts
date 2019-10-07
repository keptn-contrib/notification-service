import { Notification } from './index';
import { ConfigurationChanged } from '../../@typings/cloud-events';

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

    if (configurationChanged.data.valuesCanary.image) {
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

    /*
    // this formatting is for teams. index.js will correct formatting to work in slack
    var valuesCanaryKey, valuesCanaryValue, valuesCanaryContent = ''
    if (configurationChanged.data.valuesCanary) {
      for(let i = 0; i < configurationChanged.data.valuesCanary.length; i++){
        valuesCanaryKey = configurationChanged.data.valuesCanary[i].Key
        valuesCanaryValue = configurationChanged.data.valuesCanary[i].Value
        valuesCanaryContent += `**${valuesCanaryKey}**: ${valuesCanaryValue}`
        valuesCanaryContent += "<br>"
      }  
      this.defaultNotification.facts.push({
        name: 'Values',
        value: valuesCanaryContent
      })
    }
    */
  }
}
