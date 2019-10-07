import { Notification } from './index';
import { TestsFinished } from '../../@typings/cloud-events';

export class TestsFinishedNotification extends Notification {
  constructor(testsFinished: TestsFinished) {

    // only send the event if there is a test strategy
    if (testsFinished.data.teststrategy) {
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
            name: 'Deployment Strategy',
            value: testsFinished.data.deploymentstrategy
          },
          { 
            name: 'Started at',
            value: testsFinished.data.startedat
          }
        ],
      };

      if (testsFinished.data.teststrategy) {
        this.defaultNotification.facts.push({
          name: 'Test Strategy',
          value: testsFinished.data.teststrategy
        })
      }
    }
  }
}
