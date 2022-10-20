import { Customer } from '@prisma/client';
import { PolicyEntity } from 'src/policies/entities/policy.entity';
import { PolicyRelativeEntity } from 'src/policy-relative/entities/policy-relative.entity';

export class CustomerEntity implements Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;

  policies?: Array<PolicyEntity>;
  relativePolicies?: Array<PolicyRelativeEntity>;
}
