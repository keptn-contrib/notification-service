export interface IMessageCard {
  '@type': 'MessageCard';
  '@context': 'https://schema.org/extensions';
  correlationId?: string;
  expectedActors?: string[];
  originator?: string;
  summary?: string;
  themeColor?: string;
  hideOriginalBody?: boolean;
  title?: string;
  text?: string;
  sections?: Section[];
  potentialAction?: Action[];
}

interface Section {
  title?: string;
  startGroup?: boolean;
  heroImage?: Image;
  text?: string;
  facts?: Array<{ name: string, value: string }>;
  images?: Image[];
  potentialAction?: Action[];
  activityImage?: string;
  activityTitle?: string;
  activitySubtitle?: string;
  activityText?: string;
}

interface SectionActivityImage {
  activityImage: string;
  activityTitle: string;
  activitySubtitle: string;
  activityText: string;
}

interface Image {
  image: string;
  title: string;
}

interface OpenUri {
  '@type': 'OpenUri';
  name: string;
  targets: Array<{
    os: 'default' | 'windows' | 'iOS' | 'android';
    uri: string;
  }>;
}

interface HttpPost {
  '@type': 'HttpPOST';
  name: string;
  target: string;
  headers: {
    [header: string]: string;
  };
  body: string;
  bodyContentType: string;
}

interface ActionCard {
  name: string;
  inputs: Input[];
  actions: Action[];
}

type Input = TextInput | DateInput | MultichoiceInput;

interface CommonInput {
  id: string;
  isRequired: boolean;
  title: string;
  value: string;
}

interface TextInput extends CommonInput {
  '@type': 'TextInput';
  isMultiline: boolean;
  maxLength: number;
}

interface DateInput extends CommonInput {
  '@type': 'DateInput';
  includeTime: boolean;
}

interface MultichoiceInput extends CommonInput {
  '@type': 'MultichoiceInput';
  choices: {
    [choice: string]: string;
  };
  isMultiSelect: boolean;
  style: string;
}

type Action = OpenUri | HttpPost | ActionCard;
