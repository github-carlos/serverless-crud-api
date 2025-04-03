import { Job } from '../../src/jobs/core/entities/job.entity';
import { faker } from '@faker-js/faker';

export class JobBuilder {
  private job: Job | undefined;

  random() {
    this.job = new Job({
      id: faker.string.uuid(),
      title: faker.word.sample({ length: { min: 3, max: 15 } }),
      description: faker.lorem.text(),
      isConfidential: faker.helpers.arrayElement([true, false]),
      sallary: {
        currency: 'USD',
        value: faker.number.int()
      },
      seniority: faker.helpers.arrayElement(["JUNIOR", "MID_LEVEL", "SENIOR"]),
      status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
      company: {
        address: faker.location.streetAddress(),
        name: faker.company.name(),
        phone: faker.phone.number()
      }
    });
    return this;
  }

  withoutId() {
    if (!this.job) {
      this.job = this.build();
    }

    this.job.id = undefined;
    return this;
  }

  build(): Job {
    return this.job || this.random().build();
  }
}
