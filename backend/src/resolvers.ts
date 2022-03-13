import { UserInputError, ValidationError } from "apollo-server-core";
import {
  GraphqlContext,
  Policy,
  PoliciesArgs,
  PoliciesPaginatedResult,
  PolicyWithCustomer,
} from "./schema";

function stringLexigoraphicalComparator<T>(
  selector: (value: T) => string,
  direction: number
) {
  return (a: T, b: T) => {
    return (
      selector(a)
        .toLowerCase()
        .localeCompare(selector(b).toLowerCase(), undefined, {
          numeric: true,
        }) * direction
    );
  };
}

function policyFilter(filter?: PoliciesArgs["filter"]) {
  return (p: PolicyWithCustomer) => {
    if (filter) {
      return (
        filter.insuranceTypeFilter.includes(p.insuranceType) &&
        [p.provider, p.policyNumber, p.name].some((field) =>
          field.includes(filter.textFilter)
        )
      );
    }

    return true;
  };
}

export function getPoliciesQuery(
  _: unknown,
  {
    sortBy = {
      column: "createdAt",
      direction: "DESCENDING",
    },
    pagination = {
      page: 0,
      perPage: 10,
    },
    filter = {
      textFilter: "",
      insuranceTypeFilter: ["HEALTH", "HOUSEHOLD", "LIABILITY"],
    },
  }: PoliciesArgs,
  context: GraphqlContext
): PoliciesPaginatedResult {
  const sortedPolicies: PolicyWithCustomer[] = context.state.policies
    .map<PolicyWithCustomer>((p) => {
      // Unfortunately I have to manually prefetch customers
      // to make sort and filter by customer name working
      const customer = customerByIdResolver(p, {}, context);
      const name = `${customer.firstName} ${customer.lastName}`;

      return {
        ...p,
        customer,
        name,
      };
    })
    .sort(
      stringLexigoraphicalComparator(
        (p) => p[sortBy.column],
        sortBy.direction === "ASCENDING" ? 1 : -1
      )
    );

  const filteredPolicies = sortedPolicies.filter(policyFilter(filter));
  const totalPages = Math.floor(filteredPolicies.length / pagination.perPage);
  const start = pagination.page * pagination.perPage;

  return {
    policies: filteredPolicies.slice(start, start + pagination.perPage),
    pageInfo: {
      hasNextPage: pagination.page < totalPages,
      hasPreviousPage: pagination.page > 0,
      totalPages,
      currentPage: pagination.page,
    },
  };
}

export function mutationUpdatePolicy(
  _: unknown,
  args: Partial<Policy>,
  { state, updateState }: GraphqlContext
) {
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

  updateState({
    ...state,
    policies: [
      ...state.policies.slice(0, policyIndex),
      newPolicy,
      ...state.policies.slice(policyIndex + 1),
    ],
  });

  return newPolicy;
}

export function customerByIdResolver(
  parent: Policy,
  _: unknown,
  { state }: GraphqlContext
) {
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
