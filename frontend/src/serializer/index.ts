export const serializePolicies = (policies) => {
  return policies.map(policy => ({
    id: policy.id,
    name: `${policy.customer.firstName} ${policy.customer.lastName}`,
    provider: policy.provider,
    type: policy.insuranceType,
    status: policy.status
  }))
}