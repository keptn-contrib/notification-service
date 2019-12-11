import { Notification } from './index';
import { EvaluationDone } from '../../@typings/cloud-events';
let constants = require('constants');

export class EvaluationDoneNotification extends Notification {
  constructor(evaluationDone: EvaluationDone) {
    super(evaluationDone);

    this.defaultNotification = {
      title: 'EVALUATION DONE',
      facts: [
        {
          name: 'Project',
          value: evaluationDone.data.project,
        },
        {
          name: 'Stage',
          value: evaluationDone.data.stage,
        },
        {
          name: 'Service',
          value: evaluationDone.data.service,
        },
        /* in keptn0.6 the image reference is no longer available in evaluation_done
        {
          name: 'Image',
          value: evaluationDone.data.image + ':' + evaluationDone.data.tag,
        },*/
        {
          name: 'Deployment Strategy',
          value: evaluationDone.data.deploymentstrategy,
        },
      ],
    };

    if (evaluationDone.data.teststrategy) {
      this.defaultNotification.facts.push({
        name: 'Test Strategy',
        value: evaluationDone.data.teststrategy,
      });
    }

    // add an emoji and color based on evaluationpassed value
    let evaluationpassed_value = '';
    if (evaluationDone.data.result === 'pass') {
      this.defaultNotification.teamsThemeColor = '31cc62';  // green
      this.defaultNotification.webexTeamsColor = 'success'; // green
      evaluationpassed_value += 'true  &#x1F44D;';  // unicode for thumbsup
    }
    else if (evaluationDone.data.result === 'warning') {
      this.defaultNotification.teamsThemeColor = 'ffff00';  // yellow
      this.defaultNotification.webexTeamsColor = 'warning'; // yellow
      // TODO find emoji for warning
      evaluationpassed_value += 'warning  &#x1F44D;';  // unicode for thumbsup
    }
    else {
      this.defaultNotification.teamsThemeColor = 'ed1909';  // red
      this.defaultNotification.webexTeamsColor = 'danger'; // red

      evaluationpassed_value += 'false  &#x26D4;'; // unicode for no_entry
    }
    this.defaultNotification.facts.push({
      name: 'Evaluation passed',
      value: evaluationpassed_value,
    });

    this.defaultNotification.facts.push({
      name: 'Evaluation message',
      value: evaluationDone.data.evaluationdetails.result,
    });

    let totalScoreValue = '';
    if (evaluationDone.data.evaluationdetails.score === 0) {
      totalScoreValue = '0';
    }
    if (evaluationDone.data.evaluationdetails.score) {
      totalScoreValue = evaluationDone.data.evaluationdetails.score.toString();
    }
    if (totalScoreValue !== '') {
      this.defaultNotification.facts.push({
        name: 'Total Score',
        value: totalScoreValue,
      });
    }

    if (evaluationDone.data.evaluationdetails.objectives) {
      const pass = evaluationDone.data.evaluationdetails.objectives.pass || 'N/A';
      const warn = evaluationDone.data.evaluationdetails.objectives.warning || 'N/A';
      this.defaultNotification.facts.push({
        name: 'Objectives',
        value: `Pass: ${pass}, Warn: ${warn}`,
      });
    }

    // this formatting is for teams. index.js will correct formatting to work in slack
    let facts_value = '', id, score, targets, result;
    if (evaluationDone.data.evaluationdetails.indicatorResults) {
      for (let i = 0; i < evaluationDone.data.evaluationdetails.indicatorResults.length; i++) {
        if (evaluationDone.data.evaluationdetails.indicatorResults[i].value) {
          id = evaluationDone.data.evaluationdetails.indicatorResults[i].value.metric;
          if (evaluationDone.data.evaluationdetails.indicatorResults[i].value.message) {
            result = evaluationDone.data.evaluationdetails.indicatorResults[i].value.message;
            facts_value += `**${id}**: ${result}`;
          } else {
            result = evaluationDone.data.evaluationdetails.indicatorResults[i].value.value;
            score = evaluationDone.data.evaluationdetails.indicatorResults[i].score;
            targets = JSON.stringify(evaluationDone.data.evaluationdetails.indicatorResults[i].targets);
            facts_value += `**${id}**: ${result}, **score:** ${score}`;
            if (targets !== '[]' && targets !== 'null') {
              facts_value += `, **targets:**<br>${targets}`;
            }
          }
          facts_value += '<br>';
        } else {
          facts_value += ``
        }
      }
      this.defaultNotification.facts.push({
        name: 'Indicator Results',
        value: facts_value,
      });
    }
  }
}
