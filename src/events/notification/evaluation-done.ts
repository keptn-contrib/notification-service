import { Notification } from './index';
import { EvaluationDone } from '../../@typings/cloud-events';
var constants = require("constants");

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
          value: evaluationDone.data.image + ":" + evaluationDone.data.tag
        },
        {
          name: 'Deployment Strategy',
          value: evaluationDone.data.deploymentstrategy
        }
      ],
    };

    if (evaluationDone.data.teststrategy) {
      this.defaultNotification.facts.push({
        name: 'Test Strategy',
        value: evaluationDone.data.teststrategy
      })
    }

    // add an emoji and color based on evaluationpassed value
    var evaluationpassed_value = ''
    if (evaluationDone.data.evaluationpassed) {
      this.defaultNotification.teamsThemeColor = "31cc62";  // green
      evaluationpassed_value += "true  &#x1F44D;"  // unicode for thumbsup
    }
    else {
      this.defaultNotification.teamsThemeColor = "ed1909";  // red
      evaluationpassed_value += "false  &#x26D4;" // unicode for no_entry
    }
    this.defaultNotification.facts.push({
      name: 'Evaluation passed',
      value: evaluationpassed_value
    })
  
    var totalScoreValue = ''
    if (evaluationDone.data.evaluationdetails.totalScore == 0) {
      totalScoreValue = '0'
    }
    if (evaluationDone.data.evaluationdetails.totalScore) {
      totalScoreValue = evaluationDone.data.evaluationdetails.totalScore.toString()
    }
    if (totalScoreValue != '') {
      this.defaultNotification.facts.push({
        name: 'Total Score',
        value: totalScoreValue
      })
    }
    
    if (evaluationDone.data.evaluationdetails.objectives) {
      const pass = evaluationDone.data.evaluationdetails.objectives.pass || "N/A";
      const warn = evaluationDone.data.evaluationdetails.objectives.warning || "N/A"
      this.defaultNotification.facts.push({
        name: 'Objectives',
        value: `Pass: ${pass}, Warn: ${warn}`
      })
    }
    
    // this formatting is for teams. index.js will correct formatting to work in slack
    var facts_value = '', id, score, violations
    if (evaluationDone.data.evaluationdetails.indicatorResults) {
      for(let i = 0; i < evaluationDone.data.evaluationdetails.indicatorResults.length; i++){
        id = evaluationDone.data.evaluationdetails.indicatorResults[i].id
        score = evaluationDone.data.evaluationdetails.indicatorResults[i].score
        violations = JSON.stringify(evaluationDone.data.evaluationdetails.indicatorResults[i].violations)
        facts_value += `**${id}**:  **score:** ${score}`
        if (violations != "[]") {
          facts_value += `, **violations:**<br>${violations}`
        }
        facts_value += "<br>"
      }  
      this.defaultNotification.facts.push({
        name: 'Indicator Results',
        value: facts_value
      })
    }

  };
}
