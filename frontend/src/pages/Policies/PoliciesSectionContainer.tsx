import { useGetPoliciesQuery } from "~/src/services/policies.service";
import { PoliciesSection } from "./components/PoliciesSection";

const PoliciesSectionContainer = () => {
  const { data: dataPolicies, isLoading } = useGetPoliciesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!dataPolicies) return <div>No data found</div>;

  return <PoliciesSection dataPolicies={dataPolicies} />;
};

export { PoliciesSectionContainer };
