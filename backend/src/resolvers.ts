import { UserInputError, ValidationError } from "apollo-server-core";
import { InsuranceTypes, Policy, State, StatusTypes } from "./schema";

// check out my other test assignment where I actually work with PostgreSQL
// https://github.com/bakedchicken/n26-test-assignment
let state: State = {
  customers: [
    {
      customerId: "41572f0e-6733-4b05-9878-986430d6bd97",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1960-01-31",
    },
    {
      customerId: "10f31763-a5a0-41ab-8f1c-0e28c46e20a2",
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "1965-01-31",
    },
    {
      customerId: "d8386c46-e227-49d4-a9fe-31ce2c79a5e0",
      firstName: "Greg",
      lastName: "Gregorovych",
      dateOfBirth: "2000-03-01",
    },
  ],
  policies: [
    {
      policyId: "cf464762-e43b-4fee-ab4c-7880e1af0679",
      provider: "Allianz",
      policyNumber: "e43b-4fee-ab4c",
      startDate: "2022-01-31",
      endDate: "2023-01-31",
      createdAt: "2022-01-30",
      customerId: "41572f0e-6733-4b05-9878-986430d6bd97",
      insuranceType: InsuranceTypes.HEALTH,
      status: StatusTypes.PENDING,
    },
    {
      policyId: "bfd375b0-7f99-47e5-a535-ab22e18827a0",
      provider: "Allianz",
      policyNumber: "7f99-47e5-a535",
      startDate: "2022-01-31",
      endDate: "2023-01-31",
      createdAt: "2022-01-30",
      customerId: "10f31763-a5a0-41ab-8f1c-0e28c46e20a2",
      insuranceType: InsuranceTypes.HEALTH,
      status: StatusTypes.CANCELLED,
    },
    {
      policyId: "e5435114-054a-47d3-88a4-66c2d37a3b98",
      provider: "Allianz",
      policyNumber: "054a-47d3-88a4",
      startDate: "2022-01-31",
      endDate: "2023-01-31",
      createdAt: "2022-01-30",
      customerId: "10f31763-a5a0-41ab-8f1c-0e28c46e20a2",
      insuranceType: InsuranceTypes.HEALTH,
      status: StatusTypes.ACTIVE,
    },
    {
      policyId: "ed2dd474-fdd4-439c-b7ac-fdce501e058f",
      provider: "Liability Insurances LLC",
      policyNumber: "fdd4-439c-b7ac",
      startDate: "2021-01-01",
      endDate: "2021-06-01",
      createdAt: "2020-12-02",
      customerId: "d8386c46-e227-49d4-a9fe-31ce2c79a5e0",
      insuranceType: InsuranceTypes.LIABILITY,
      status: StatusTypes.DROPPED_OUT,
    },
  ],
};

export function policiesQuery() {
  return state.policies;
}

export function mutationUpdatePolicy(_: unknown, args: Partial<Policy>) {
  const policyIndex = state.policies.findIndex(
    (p) => p.policyId === args.policyId
  );

  if (policyIndex === -1) {
    throw new UserInputError(`Policy with id ${args.policyId} is not found`);
  }

  const policy = state.policies[policyIndex];

  if (Date.parse(policy.startDate) >= Date.parse(policy.endDate)) {
    throw new ValidationError(`Start date could not be later than end date!`);
  }

  const newPolicy = {
    ...policy,
    ...args,
  };

  // will be persistent until server restarts
  // I think this is good enough to demonstrate that mutation is working
  state = {
    ...state,
    policies: [
      ...state.policies.slice(0, policyIndex),
      newPolicy,
      ...state.policies.slice(policyIndex + 1),
    ],
  };

  return newPolicy;
}

export function customerByIdResolver(parent: Policy) {
  const customer = state.customers.find(
    (c) => c.customerId === parent.customerId
  );

  if (!customer) {
    throw new Error(
      `Invalid relation! Customer with id ${parent.customerId} does not exist!`
    );
  }

  return customer;
}
