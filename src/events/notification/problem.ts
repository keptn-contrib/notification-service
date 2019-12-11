import { Notification } from './index';
import { Problem } from '../../@typings/cloud-events';

export class ProblemNotification extends Notification {
  constructor(problem: Problem) {
    super(problem);

    this.defaultNotification = {
      title: 'PROBLEM',
      facts: [
        {
          name: 'Problem Title',
          value: problem.data.ProblemTitle,
        },
        { 
          name: 'State',
          value: problem.data.State
        },        
        { 
          name: 'Source',
          value: problem.source,
        },
        {
          name: 'Problem ID',
          value: problem.data.ProblemID,
        },
        { 
          name: 'ImpactedEntity',
          value: problem.data.ImpactedEntity
        },
        {
          name: 'Problem Details',
          value: problem.data.ProblemDetails.ProblemDetailsJSON
        }
      ],
    };
    // Set WebexTeams color depending on the state of the problem
    if (
      /closed/gi.test(
        this.defaultNotification.facts.find(x => x.name === 'State').value,
      )
    ) {
      this.defaultNotification.webexTeamsColor = 'success'; // green
    } else {
      this.defaultNotification.webexTeamsColor = 'danger'; // red
    }
  }
}
