import { useGetPoliciesQuery } from "~/src/services/policies.service";
import { useAppSelector } from "~/src/store/hooks";
import { PoliciesSection } from "./components/PoliciesSection";

const PoliciesSectionContainer = () => {
  // Get pagination data
  const {
    pagination: { pageIndex, pageSize },
    filters: {
      insuranceStatus: insuranceStatusFilter,
      insuranceType: insuranceTypeFilter,
    },
    search,
  } = useAppSelector(({ policiesView }) => policiesView);

  // Get data from API endpoint
  const { data: dataPolicies, isLoading } = useGetPoliciesQuery({
    pagination: {
      skip: pageIndex * pageSize,
      take: pageSize,
    },
    filters: {
      insuranceType: insuranceTypeFilter,
      insuranceStatus: insuranceStatusFilter,
    },
    search: {
      provider: search?.provider,
      customerName: search?.customerName,
      customerRelatives: search?.customerRelatives,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!dataPolicies) return <div>No data found</div>;

  return <PoliciesSection dataPolicies={dataPolicies} />;
};

export { PoliciesSectionContainer };
