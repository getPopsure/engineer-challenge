export const createPolicyHistory = (history: any, eventType: string) => {
  const { id, createdAt, ...rest } = history
  const policyHistory = {
    policyId: id,
    eventType,
    ...rest,
  }
  return policyHistory
}
