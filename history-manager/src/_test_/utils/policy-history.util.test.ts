import {
  createPolicyHistory,
  createFamilyHistory,
} from './../../utils/policy-history.util'

describe('PolicyHistory', () => {
  test('createPolicyHistory should be present', () => {
    expect(createPolicyHistory).toBeTruthy()
  })
  test('create history event from createPolicyHistory', () => {
    const mockEvent = {
      id: '74d301c4-94da-446e-8b4a-86427b79ad2b',
      provider: 'BARMER',
      insuranceType: 'HEALTH',
      status: 'PENDING',
      startDate: '2017-04-26T05:32:06.000Z',
      endDate: null,
      familyMembers: [
        {
          id: 'f34abccd-bfbb-4098-9886-9f93efde5626',
          firstName: 'Sunil',
          lastName: 'Biddlecombe',
          dateOfBirth: '1990-12-03T06:33:17.000Z',
          policyId: '74d301c4-94da-446e-8b4a-86427b79ad2b',
        },
      ],
      customer: {
        id: 'c4285fe2-2b10-4934-ab23-676b995cdbbf',
        firstName: 'Cyrillus',
        lastName: 'Biddlecombe',
        dateOfBirth: '1978-12-03T06:33:17.000Z',
      },
    }
    const eventType = 'FAMILY_MEMBER_ADD'
    const res = createFamilyHistory(mockEvent, eventType)
    expect(res).toBeTruthy()
    expect(res).toHaveProperty('policyId')
    expect(res).toHaveProperty('id')
    expect(res).toHaveProperty('memberId')
    expect(res).toHaveProperty('customer')
    expect(res).toHaveProperty('familyMembers')
    expect(Array.isArray(res.familyMembers)).toBe(true)
    expect(typeof res.customer).toBe('object')
    expect(res.eventType).toEqual(eventType)
  })

  test('createFamilyHistory should be present', () => {
    expect(createFamilyHistory).toBeTruthy()
  })

  test('create family history event from createFamilyHistory', () => {
    const mockEvent = {
      id: 'f34abccd-bfbb-4098-9886-9f93efde5626',
      firstName: 'Sunil',
      lastName: 'Biddlecombe',
      dateOfBirth: '1990-12-03T06:33:17.000Z',
      policyId: '74d301c4-94da-446e-8b4a-86427b79ad2b',
    }
    const eventType = 'FAMILY_MEMBER_ADD'
    const res = createFamilyHistory(mockEvent, eventType)
    expect(res).toBeTruthy()
    expect(res).toHaveProperty('policyId')
    expect(res).toHaveProperty('id')
    expect(res).toHaveProperty('memberId')
    expect(res.eventType).toEqual(eventType)
  })
})
