import { Notification } from './index';
import { TestsFinished } from '../../@typings/cloud-events';

export class TestsFinishedNotification extends Notification {
  constructor(testsFinished: TestsFinished) {
    super(testsFinished);

    this.defaultNotification = {
      title: 'TESTS FINISHED',
      facts: [
        { 
          name: 'Project',
          value: testsFinished.data.project
        },
        { 
          name: 'Stage',
          value: testsFinished.data.stage
        },
        { 
          name: 'Service',
          value: testsFinished.data.service
        },
        { 
          name: 'Test Strategy',
          value: testsFinished.data.teststrategy
        },
        { 
          name: 'Deployment Strategy',
          value: testsFinished.data.deploymentstrategy
        },
        { 
          name: 'Started at',
          value: testsFinished.data.startedat
        }
      ],
    };
  }
}
