import { Notification, IDefaultNotification } from './index';
import { EvaluationDone } from '../../@typings/cloud-events';

export class EvaluationDoneNotification extends Notification {
  constructor(private readonly evaluationDone: EvaluationDone) {
    super();
  }

  defaultNotification: IDefaultNotification = {
    title: 'EVALUATION DONE',
    facts: [
      { 
        name: 'Project',
        value: this.evaluationDone.data.project
      },
      {
        name: 'Stage',
        value: this.evaluationDone.data.stage
      },
      { 
        name: 'Service',
        value: this.evaluationDone.data.service
      },
      {
        name: 'Image',
        value: this.evaluationDone.data.image
      },
      { 
        name: 'Tag',
        value: this.evaluationDone.data.tag
      },
      { 
        name: 'Evaluation passed',
        value: this.evaluationDone.data.evaluationpassed
      },
      { 
        name: 'Deployment Stategy',
        value: this.evaluationDone.data.deploymentstrategy
      },
      { 
        name: 'Test Strategy',
        value: this.evaluationDone.data.teststrategy
      },
      {
        name: 'Keptn context',
        value: this.evaluationDone.shkeptncontext
      }
    ],
  };
}
