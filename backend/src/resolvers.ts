import { UserInputError, ValidationError } from "apollo-server-core";
import { Customer, GraphqlContext, Policy, PolicySortingArgs } from "./schema";

type PolicyWithCustomer = Policy & {
  customer: Customer;
  name: string;
};

function stringLexigoraphicalComparator<T>(
  selector: (value: T) => string,
  sortBy: PolicySortingArgs["sortBy"]
) {
  return (a: T, b: T) => {
    const multiplier = sortBy.direction === "ASCENDING" ? 1 : -1;

    return (
      selector(a)
        .toLowerCase()
        .localeCompare(selector(b).toLowerCase(), undefined, {
          numeric: true,
        }) * multiplier
    );
  };
}

export function getPoliciesQuery(
  _: unknown,
  { sortBy }: PolicySortingArgs,
  context: GraphqlContext
) {
  if (sortBy.column === "name") {
    return context.state.policies
      .map<PolicyWithCustomer>((p) => {
        // Unfortunately I have to manually prefetch customers
        // to be able to sort and filter by customer name
        const customer = customerByIdResolver(p, {}, context);
        const name = `${customer.firstName} ${customer.lastName}`;

        return {
          ...p,
          customer,
          name,
        };
      })
      .sort(stringLexigoraphicalComparator((p) => p.name, sortBy));
  }

  return [...context.state.policies].sort(
    stringLexigoraphicalComparator(
      (p) => p[sortBy.column as keyof Policy],
      sortBy
    )
  );
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

  // will be persistent until server restarts
  // I think this is good enough to demonstrate that mutation is working
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
