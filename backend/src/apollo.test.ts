import { createApolloServer } from "./apollo";
import { GraphqlContext } from "./schema";

const mockContext: GraphqlContext = {
  state: {
    policies: [
      {
        policyId: "5c13a990-f7ba-42dc-be9b-984637ea0fd7",
        provider: "Allianz",
        policyNumber: "622e471bc8671885ae9f028e",
        startDate: "2020-11-23",
        endDate: "2022-08-26",
        createdAt: "2020-10-29",
        customerId: "526ac3b7-779f-4f4c-872d-8c4ab28000a4",
        insuranceType: "LIABILITY",
        status: "ACTIVE",
      },
    ],
    customers: [
      {
        customerId: "526ac3b7-779f-4f4c-872d-8c4ab28000a4",
        firstName: "Shauna",
        lastName: "Garrett",
        dateOfBirth: "1964-04-13",
      },
    ],
  },
  updateState: (value) => value,
};

describe("apollo server", () => {
  describe("getPolicies", () => {
    it("should be registered", async () => {
      const server = createApolloServer();

      const result = await server.executeOperation({
        query: `
          query {
            paginatedPolicies {
              __typename
            }
          }
        `,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data?.paginatedPolicies).toEqual({
        __typename: "PoliciesPaginatedResult",
      });
    });

    it("should resolve policies successfully", async () => {
      const server = createApolloServer(mockContext);

      const result = await server.executeOperation({
        query: `
          query {
            paginatedPolicies {
              policies {
                policyId
              }
            }
          }
        `,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data?.paginatedPolicies?.pageInfo).toBeUndefined();
      expect(result.data?.paginatedPolicies?.policies[0]).toEqual({
        policyId: "5c13a990-f7ba-42dc-be9b-984637ea0fd7",
      });
    });

    it("should resolve customer successfuly", async () => {
      const server = createApolloServer(mockContext);

      const result = await server.executeOperation({
        query: `
          query {
            paginatedPolicies {
              policies {
                policyId,
                customer {
                  customerId
                }
              }
            }
          }
        `,
      });

      expect(result.errors).toBeUndefined();
      expect(result.data?.paginatedPolicies?.pageInfo).toBeUndefined();
      expect(result.data?.paginatedPolicies?.policies[0].customer).toEqual({
        customerId: "526ac3b7-779f-4f4c-872d-8c4ab28000a4",
      });
    });
  });
});
