import { Customer, Policy, Status } from "../types";

const parsePolicyData = (policy: any): Policy => {
  const customer: Customer = {
    id: policy.customer.id,
    firstName: policy.customer.firstName,
    lastName: policy.customer.lastName,
    dateOfBirth: new Date(policy.customer.dateOfBirth),
  }

  return {
    id: policy.id,
    customer: customer,
    provider: policy.provider,
    insuranceType: policy.insuranceType,
    status: policy.status as Status,
    startDate: new Date(policy.startDate),
    endDate: policy.endDate ? new Date(policy.endDate) : null,
    createdAt: new Date(policy.createdAt),
  }
}

const parsePolicies = (policies: any[]) => policies.map(parsePolicyData);
export default parsePolicies;