import { ApiProperty } from '@nestjs/swagger';
import { InsuranceType, Policy, PolicyStatus } from '@prisma/client';
import { CustomerEntity } from 'src/customer/entities/customer.entity';

export class PolicyEntity implements Policy {
  id: string;

  customer?: CustomerEntity;

  customerId: string;

  provider: string;

  @ApiProperty({
    enum: Object.values(InsuranceType),
  })
  insuranceType: InsuranceType;

  @ApiProperty({
    enum: Object.values(PolicyStatus),
  })
  status: PolicyStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
