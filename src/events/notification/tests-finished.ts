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
          name: 'Image',
          value: testsFinished.data.image + ":" + testsFinished.data.tag
        },
        { 
          name: 'Deployment Strategy',
          value: testsFinished.data.deploymentstrategy
        },
        { 
          name: 'Test Strategy',
          value: testsFinished.data.teststrategy
        },
      ],
    };
  }
}