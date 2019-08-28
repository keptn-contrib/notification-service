import { Notification } from './index';
import { DeploymentFinished } from '../../@typings/cloud-events';

export class DeploymentFinishedNotification extends Notification {
  constructor(deploymentFinished: DeploymentFinished) {
    super(deploymentFinished);

    this.defaultNotification = {
      title: 'DEPLOYMENT FINISHED',
      facts: [
        { 
          name: 'Project',
          value: deploymentFinished.data.project
        },
        { 
          name: 'Stage',
          value: deploymentFinished.data.stage
        },
        { 
          name: 'Service',
          value: deploymentFinished.data.service
        },
        {
          name: 'Image',
          value: deploymentFinished.data.image + ":" + deploymentFinished.data.tag
        },
        { 
          name: 'Deployment Strategy',
          value: deploymentFinished.data.deploymentstrategy
        }
      ],
    };

    if (deploymentFinished.data.teststrategy) {
      this.defaultNotification.facts.push({
        name: 'Test Strategy',
        value: deploymentFinished.data.teststrategy
      })
    }
  }


}