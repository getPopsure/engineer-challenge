import { PolicyRelative } from '@prisma/client';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { PolicyEntity } from '../../policies/entities/policy.entity';

export class PolicyRelativeEntity implements PolicyRelative {
  id: string;
  role: string;

  policyId: string;
  policy?: PolicyEntity;
  relativeId: string;
  relative?: CustomerEntity;
}
