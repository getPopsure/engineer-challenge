import { Customer, Policy, PolicyResponse, Status } from "../types";

const parsePolicyData = (policy: PolicyResponse): Policy => {
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
  }
}

const parsePolicies = (policies: any[]) => policies.map(parsePolicyData);
export default parsePolicies;