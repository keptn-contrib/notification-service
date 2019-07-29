import { Notification, IDefaultNotification } from './index';
import { DeploymentFinished } from '../../@typings/cloud-events';

export class DeploymentFinishedNotification extends Notification {
  constructor(private readonly deploymentFinished: DeploymentFinished) {
    super();
  }

  defaultNotification: IDefaultNotification = {
    title: 'DEPLOYMENT FINISHED',
    facts: [
      { 
        name: 'Project',
        value: this.deploymentFinished.data.project
      },
      { 
        name: 'Stage',
        value: this.deploymentFinished.data.stage
      },
      { 
        name: 'Service',
        value: this.deploymentFinished.data.service
      },
      {
        name: 'Image',
        value: this.deploymentFinished.data.image
      },
      { 
        name: 'Tag',
        value: this.deploymentFinished.data.tag
      },
      { 
        name: 'Deployment Stategy',
        value: this.deploymentFinished.data.deploymentstrategy
      },
      { 
        name: 'Test Strategy',
        value: this.deploymentFinished.data.teststrategy
      },
      {
        name: 'Keptn context',
        value: this.deploymentFinished.shkeptncontext
      }
    ],
  };
}