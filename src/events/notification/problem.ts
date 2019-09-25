import { Notification } from './index';
import { Problem } from '../../@typings/cloud-events';

export class ProblemNotification extends Notification {
  constructor(problem: Problem) {
    super(problem);

    this.  defaultNotification = {
      title: 'PROBLEM',
      facts: [
        { 
          name: 'Problem Title',
          value: problem.data.ProblemTitle
        },
        { 
          name: 'Source',
          value: problem.source
        },
        { 
          name: 'PID',
          value: problem.data.PID
        },
        {
          name: 'Problem ID',
          value: problem.data.ProblemID
        },
        { 
          name: 'State',
          value: problem.data.State
        }
      ],
    };
  }
}