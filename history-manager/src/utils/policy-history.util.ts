import { v4 as uuidv4 } from 'uuid'

export const createPolicyHistory = (history: any, eventType: string) => {
  const { id, createdAt, endDate, ...rest } = history
  const policyHistory = {
    id: uuidv4(),
    policyId: id,
    endDate: endDate ? endDate : '',
    eventType,
    ...rest,
  }
  return policyHistory
}

export const createFamilyHistory = (members: any, eventType: string) => {
  const { id, policyId, createdAt, endDate, ...rest } = members
  const familyHistory = {
    id: uuidv4(),
    memberId: id,
    policyId,
    eventType,
    ...rest,
  }
  return familyHistory
}
