import { rest } from 'msw';

export const validCustomer = {
  firstName: 'Cyrillus',
  lastName: 'Biddlecombe',
};

export const policyMockResponse = [
  {
    id: 'cd5613c6-ab2d-4985-a129-5efe711c368f',
    provider: 'BARMER',
    insuranceType: 'HEALTH',
    status: 'PENDING',
    startDate: '2017-04-26T05:32:06.000Z',
    endDate: null,
    customer: {
      id: '980e1c21-ae5a-404a-a200-5a8a030a8721',
      dateOfBirth: '1978-12-03T06:33:17.000Z',
      ...validCustomer,
    },
  },
];

export const policyMockHandler = rest.get(
  'http://localhost:4000/policies',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(policyMockResponse));
  }
);
