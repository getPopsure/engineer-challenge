import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";

export const QUERY_POLICY = gql`
  query GetPolicy($id: String!) {
    policy(id: $id) {
      policyId
      provider
      policyNumber
      startDate
      endDate
      insuranceType
      status
      customer {
        customerId
        firstName
        lastName
        dateOfBirth
      }
    }
  }
`;

export default React.memo(function PolicyPage() {
  const { id } = useParams();
  const { error, data } = useQuery(QUERY_POLICY, {
    variables: {
      id,
    },
  });

  if (error) {
    return <h2 className="text-red-400">{error.message}</h2>;
  }

  return (
    <div className="py-4">
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
});
