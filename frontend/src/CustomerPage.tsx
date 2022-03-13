import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";

export const QUERY_CUSTOMER = gql`
  query GetCustomer($id: String!) {
    customer(id: $id) {
      customerId
      firstName
      lastName
      dateOfBirth
    }
  }
`;

export default React.memo(function CustomerPage() {
  const { id } = useParams();
  const { error, data } = useQuery(QUERY_CUSTOMER, {
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
