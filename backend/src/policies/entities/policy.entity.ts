import { ApiProperty } from '@nestjs/swagger';
import { InsuranceType, Policy, PolicyStatus } from '@prisma/client';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { PolicyRelativeEntity } from 'src/policy-relative/entities/policy-relative.entity';

export class PolicyEntity implements Policy {
  id: string;
  provider: string;

  @ApiProperty({
    enum: Object.values(InsuranceType),
  })
  insuranceType: InsuranceType;

  @ApiProperty({
    enum: Object.values(PolicyStatus),
  })
  status: PolicyStatus;

  customer?: CustomerEntity;
  customerId: string;
  relatives: Array<PolicyRelativeEntity>;

  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
