import { useMemo } from "react";
import { Policy } from "src/types/tempTypes";
import { TableComponent } from "~/src/components/Table/TableComponent";
import {
  mapPoliciesToTableData,
  tableColumnsPolicies,
} from "./PoliciesSection.table-utils";

type PoliciesSectionProps = {
  dataPolicies: Policy[];
};

const PoliciesSection = ({ dataPolicies }: PoliciesSectionProps) => {
  // Format API data to table data
  const dataPoliciesMapped = useMemo(
    () => mapPoliciesToTableData(dataPolicies),
    []
  );

  return (
    <TableComponent<Policy>
      columns={tableColumnsPolicies}
      data={dataPoliciesMapped}
    />
  );
};

export { PoliciesSection };
