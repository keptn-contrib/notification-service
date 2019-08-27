import { Notification } from './index';
import { EvaluationDone } from '../../@typings/cloud-events';

export class EvaluationDoneNotification extends Notification {
  constructor(evaluationDone: EvaluationDone) {
    super(evaluationDone);

    this.defaultNotification = {
      title: 'EVALUATION DONE',
      facts: [
        {
          name: 'Project',
          value: evaluationDone.data.project
        },
        {
          name: 'Stage',
          value: evaluationDone.data.stage
        },
        {
          name: 'Service',
          value: evaluationDone.data.service
        },
        {
          name: 'Image',
          value: evaluationDone.data.image
        },
        {
          name: 'Tag',
          value: evaluationDone.data.tag
        },
        {
          name: 'Evaluation passed',
          value: evaluationDone.data.evaluationpassed.toString()
        },
        {
          name: 'Deployment Strategy',
          value: evaluationDone.data.deploymentstrategy
        },
        {
          name: 'Test Strategy',
          value: evaluationDone.data.teststrategy
        },
      ],
    };

    if (evaluationDone.data.evaluationdetails.objectives) {
      const pass = evaluationDone.data.evaluationdetails.objectives.pass || "N/A";
      const warn = evaluationDone.data.evaluationdetails.objectives.warning || "N/A"
      this.defaultNotification.facts.push({
        name: 'Objectives',
        value: `Pass: ${pass}, Warn: ${warn}`
      })
    }

    if (evaluationDone.data.evaluationdetails.totalScore) {
      this.defaultNotification.facts.push({
        name: 'Total Score',
        value: evaluationDone.data.evaluationdetails.totalScore.toString()
      })
    }
  };
}
