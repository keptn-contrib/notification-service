import { Notification, IDefaultNotification } from './index';
import { NewArtifact } from '../../@typings/cloud-events';

export class NewArtifactNotification extends Notification {
  constructor(private readonly newArtifact: NewArtifact) {
    super();
  }

  defaultNotification: IDefaultNotification = {
    title: 'NEW ARTIFACT',
    facts: [
      { 
        name: 'Project',
        value: this.newArtifact.data.project
      },
      { 
        name: 'Stage',
        value: this.newArtifact.data.stage
      },
      { 
        name: 'Service',
        value: this.newArtifact.data.service
      },
      {
        name: 'Image',
        value: this.newArtifact.data.image
      },
      { 
        name: 'Tag',
        value: this.newArtifact.data.tag
      },
      { 
        name: 'Deployment Stategy',
        value: this.newArtifact.data.deploymentstrategy
      },
      { 
        name: 'Test Strategy',
        value: this.newArtifact.data.teststrategy
      },
      {
        name: 'Keptn context',
        value: this.newArtifact.shkeptncontext
      }
    ],
  };
}