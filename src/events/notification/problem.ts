import { Notification, IDefaultNotification } from './index';
import { Problem } from '../../@typings/cloud-events';

export class ProblemNotification extends Notification {
  constructor(private readonly problem: Problem) {
    super();
  }

  defaultNotification: IDefaultNotification = {
    title: 'PROBLEM',
    facts: [
      { 
        name: 'Problem Title',
        value: this.problem.data.ProblemTitle
      },
      { 
        name: 'Source',
        value: this.problem.source
      },
      { 
        name: 'PID',
        value: this.problem.data.PID
      },
      {
        name: 'Problem ID',
        value: this.problem.data.ProblemID
      },
      { 
        name: 'State',
        value: this.problem.data.State
      }
    ],
  };
}