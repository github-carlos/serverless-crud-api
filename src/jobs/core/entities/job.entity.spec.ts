import { describe, expect, it } from "vitest";
import { JobBuilder } from "../../../../test/builders/job.builder";
import { InvalidFieldsError } from "../../../shared/errors/client-side/invalid-fields.error";
import { Job, JobFieldsSchema } from "./job.entity";

describe('#JobEntity', () => {
  describe('Validation Rules', () => {
    it('should generate UUID if id is not provided', () => {
      const jobData = new JobBuilder().build().toDTO();
      delete jobData.id;
      const job = new Job(jobData);
      expect(job.id).not.toBeNull();
      expect(job.id).toBeTypeOf('string')
    });

    describe('Title Validation', () => {
      it('should throw error when title is missing', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete (jobData as any).title;
        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });

      it('should throw error when title is less than 3 characters', () => {
        const jobData = new JobBuilder().build().toDTO();
        jobData.title = 'ab';

        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });
    });

    describe('Description Validation', () => {
      it('should allow missing description', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete jobData.description;

        expect(() => new Job(jobData)).not.toThrow();
      });

      it('should throw error when description is less than 10 characters', () => {
        const jobData = new JobBuilder().build().toDTO();
        jobData.description = 'short';

        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });
    });

    describe('Sallary Validation', () => {
      it('should throw error when sallary is missing', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete (jobData as any).sallary;

        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });

      it('should use USD as default currency when currency is missing', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete (jobData.sallary as any).currency;

        const job = new Job(jobData);
        expect(job.sallary.currency).toBe('USD');
      });

      it('should throw error when sallary value is missing', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete (jobData.sallary as any).value;

        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });
    });

    describe('Seniority Validation', () => {
      it('should throw error when seniority is missing', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete (jobData as any).seniority;

        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });

      it('should throw error when seniority is invalid', () => {
        const jobData = new JobBuilder().build().toDTO();
        (jobData as any).seniority = 'INVALID';

        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });

      it('should accept all valid seniority values', () => {
        const validSeniorities = ["JUNIOR", "MID_LEVEL", "SENIOR"];

        validSeniorities.forEach(seniority => {
          const jobData = new JobBuilder().build().toDTO();
          jobData.seniority = seniority as any;

          expect(() => new Job(jobData)).not.toThrow();
        });
      });
    });

    describe('Status Validation', () => {
      it('should default to ACTIVE when status is not provided', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete jobData.status;

        const job = new Job(jobData);
        expect(job.status).toBe('ACTIVE');

        // Also verify through schema
        const result = JobFieldsSchema.parse(jobData);
        expect(result.status).toBe('ACTIVE');
      });

      it('should throw error when status is invalid', () => {
        const jobData = new JobBuilder().build().toDTO();
        (jobData as any).status = 'INVALID';

        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });

      it('should accept all valid status values', () => {
        const validStatuses = ["ACTIVE", "INACTIVE"];

        validStatuses.forEach(status => {
          const jobData = new JobBuilder().build().toDTO();
          jobData.status = status as any;

          expect(() => new Job(jobData)).not.toThrow();
        });
      });
    });

    describe('IsConfidential Validation', () => {
      it('should default to false when isConfidential is not provided', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete jobData.isConfidential;

        const job = new Job(jobData);
        expect(job.isConfidential).toBe(false);

        // Also verify through schema
        const result = JobFieldsSchema.parse(jobData);
        expect(result.isConfidential).toBe(false);
      });

      it('should throw error when isConfidential is not boolean', () => {
        const jobData = new JobBuilder().build().toDTO();
        (jobData as any).isConfidential = 'true';

        expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
      });
    });

    describe('Company Validation', () => {
      it('should allow missing company', () => {
        const jobData = new JobBuilder().build().toDTO();
        delete jobData.company;

        expect(() => new Job(jobData)).not.toThrow();
      });

      it('should validate company fields when provided', () => {
        const jobData = new JobBuilder().build().toDTO();
        if (jobData.company) {
          delete (jobData.company as any).name;

          expect(() => new Job(jobData)).toThrow(InvalidFieldsError);
        }
      });
    });
  });

  describe('Getters and Setters', () => {
    it('should update and validate fields through setters', () => {
      const job = new JobBuilder().build();

      // Valid updates
      expect(() => {
        job.title = 'New Valid Title';
        job.seniority = 'SENIOR';
        job.status = 'INACTIVE';
        job.isConfidential = true;
      }).not.toThrow();

      // Invalid updates should throw
      expect(() => {
        job.title = 'ab'; // too short
      }).toThrow(InvalidFieldsError);
    });
  });

  describe('toDTO', () => {
    it('should return a valid DTO with all fields', () => {
      const job = new JobBuilder().build();
      const dto = job.toDTO();

      expect(dto).toHaveProperty('id');
      expect(dto).toHaveProperty('title');
      expect(dto).toHaveProperty('sallary');
      expect(dto).toHaveProperty('seniority');
      expect(dto).toHaveProperty('status');
      expect(dto).toHaveProperty('isConfidential');
    });
  });
});
