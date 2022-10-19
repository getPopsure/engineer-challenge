import { useGetPoliciesQuery } from "~/src/services/policies.service";
import { useAppSelector } from "~/src/store/hooks";
import { PoliciesSection } from "./components/PoliciesSection";

const PoliciesSectionContainer = () => {
  // Get pagination data
  const { pageIndex, pageSize } = useAppSelector(
    ({ policiesView }) => policiesView.pagination
  );

  const { data: dataPolicies, isLoading } = useGetPoliciesQuery({
    pagination: {
      skip: pageIndex * pageSize,
      take: pageSize,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!dataPolicies) return <div>No data found</div>;

  return <PoliciesSection dataPolicies={dataPolicies} />;
};

export { PoliciesSectionContainer };
