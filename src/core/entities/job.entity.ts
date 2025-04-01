export enum SenioritiesEnum {
  JUNIOR = 'JUNIOR',
  MID_LEVEL = 'MID_LEVEL',
  SENIOR = 'SENIOR'
}
export enum JobStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type JobFields = {
  title: string;
  description?: string;
  seniority: SenioritiesEnum;
  requirements: [string];
  status: JobStatusEnum;
  isConfidential: boolean;
  company?: {
    name: string;
    address: string;
    phone: string;
  }
}

export class Job {
  constructor(private fields: JobFields) { }
}
