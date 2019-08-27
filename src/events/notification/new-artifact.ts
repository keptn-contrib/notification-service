import { Notification } from './index';
import { NewArtifact } from '../../@typings/cloud-events';

export class NewArtifactNotification extends Notification {
  constructor(newArtifact: NewArtifact) {
    super(newArtifact);

    this.defaultNotification = {
      title: 'NEW ARTIFACT',
      facts: [
        { 
          name: 'Project',
          value: newArtifact.data.project
        },
        { 
          name: 'Stage',
          value: newArtifact.data.stage
        },
        { 
          name: 'Service',
          value: newArtifact.data.service
        },
        {
          name: 'Image',
          value: newArtifact.data.image
        },
        { 
          name: 'Tag',
          value: newArtifact.data.tag
        },
        { 
          name: 'Deployment Strategy',
          value: newArtifact.data.deploymentstrategy
        },
        { 
          name: 'Test Strategy',
          value: newArtifact.data.teststrategy
        },
      ],
    };
  }


}