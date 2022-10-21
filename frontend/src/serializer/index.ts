export const serializePolicies = (policies) => {
  return policies.map(policy => ({
    id: policy.id,
    firstName: policy.customer.firstName,
    lastName: policy.customer.lastName,
    provider: policy.provider,
    type: policy.insuranceType,
    status: policy.status
  }))
}