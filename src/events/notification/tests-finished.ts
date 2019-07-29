import { Notification, IDefaultNotification } from './index';
import { TestsFinished } from '../../@typings/cloud-events';

export class TestsFinishedNotification extends Notification {
  constructor(private readonly testsFinished: TestsFinished) {
    super();
  }

  defaultNotification: IDefaultNotification = {
    title: 'TESTS FINISHED',
    facts: [
      { 
        name: 'Project',
        value: this.testsFinished.data.project
      },
      { 
        name: 'Stage',
        value: this.testsFinished.data.stage
      },
      { 
        name: 'Service',
        value: this.testsFinished.data.service
      },
      {
        name: 'Image',
        value: this.testsFinished.data.image
      },
      { 
        name: 'Tag',
        value: this.testsFinished.data.tag
      },
      { 
        name: 'Deployment Stategy',
        value: this.testsFinished.data.deploymentstrategy
      },
      { 
        name: 'Test Strategy',
        value: this.testsFinished.data.teststrategy
      },
      {
        name: 'Keptn context',
        value: this.testsFinished.shkeptncontext
      }
    ],
  };
}