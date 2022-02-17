export const policies = [
  {
    customer: {
      firstName: "John",
      lastName: "Meyer",
      dateOfBirth: new Date(2020, 12, 12),
    },
    provider: "Allianz",
    insuranceType: "LIABILITY",
    status: "ACTIVE",
    policyNumber: "12334",
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
  },
  {
    customer: {
      firstName: "Chris",
      lastName: "Martin",
      dateOfBirth: new Date(),
    },
    provider: "AXA",
    insuranceType: "HOUSEHOLD",
    status: "PENDING",
    policyNumber: "12334",
    startDate: new Date(),
    endDate: new Date(),
    createdAt: 123232,
  },
];
