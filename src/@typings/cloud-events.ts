export const enum CloudEventType {
  NewArtifact = 'sh.keptn.events.new-artifact',
  ConfigurationChanged = 'sh.keptn.events.configuration-changed',
  DeploymentFinished = 'sh.keptn.events.deployment-finished',
  TestsFinished = 'sh.keptn.events.tests-finished',
  EvaluationDone = 'sh.keptn.events.evaluation-done',
  Problem = 'sh.keptn.events.problem',
}

export type NewArtifact = Base<{
  githuborg: string;
  project: string;
  teststrategy: string;
  deploymentstrategy: string;
  stage: string;
  service: string;
  image: string;
  tag: string;
  
}>;

export type ConfigurationChanged = Base<{
  service: string;
  image: string;
  tag: string;
  project: string;
  stage: string;
  githuborg: string;
  teststrategy: string;
  deploymentstrategy: string;
}>;

export type DeploymentFinished = Base<{
  githuborg: string;
  project: string;
  teststrategy: string;
  deploymentstrategy: string;
  stage: string;
  service: string;
  image: string;
  tag: string;
}>;

export type TestsFinished = Base<{
  githuborg: string;
  project: string;
  teststrategy: string;
  deploymentstrategy: string;
  stage: string;
  service: string;
  image: string;
  tag: string;
}>;

export type EvaluationDone = Base<{
  githuborg: string;
  project: string;
  teststrategy: string;
  deploymentstrategy: string;
  stage: string;
  service: string;
  image: string;
  tag: string;
  evaluationpassed: any;
  // Evaluation Details isn't strictly typed
  evaluationdetails: unknown ;
}>;

export type Problem = Base<{
  State: string;
  ProblemID: string;
  PID: string;
  ProblemTitle: string;
  // { ProblemDetailsJSON }
  ProblemDetails: unknown;
  // { ImpactedEntities }
  ImpactedEntities: unknown;
  ImpactedEntity: string;
}>;

export interface CloudEvent {
  specversion: string;
  type: CloudEventType;
  source: string;
  time: string;
  datacontenttype: string;
  shkeptncontext: string;
  data: unknown;
}

interface Base<D> extends CloudEvent {
  type: CloudEventType;
  shkeptncontext: string;
  data: D;
}