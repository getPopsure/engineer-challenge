import { PaginationState } from "@tanstack/table-core";
import { useEffect, useMemo, useState } from "react";
import { TableComponent } from "~/src/components/Table/TableComponent";
import { useAppDispatch, useAppSelector } from "~/src/store/hooks";
import { PolicyEntity } from "~/src/types/generated";
import { PaginatedResponse } from "~/src/types/tempTypes";
import {
  mapPoliciesToTableData,
  tableColumnsPolicies,
} from "./PoliciesSection.table-utils";
import { setTablePagination } from "./policiesSlice";

type PoliciesSectionProps = {
  dataPolicies: PaginatedResponse<PolicyEntity>;
};

const PoliciesSection = ({ dataPolicies }: PoliciesSectionProps) => {
  const dispatch = useAppDispatch();

  const [{ pageIndex, pageSize }, setTablePaginationLocal] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  // Format API data to table data
  const dataPoliciesMapped = useMemo(
    () => mapPoliciesToTableData(dataPolicies.data),
    [dataPolicies]
  );

  // Update redux store with pagination data (TODO: rely only on one source of truth)
  useEffect(() => {
    dispatch(setTablePagination({ pageIndex, pageSize }));
  }, [pageIndex, pageSize]);

  const pageCount = useMemo(
    () => Math.ceil(dataPolicies.pagination.total / pageSize),
    [pageIndex, pageSize, dataPolicies.pagination.total]
  );

  return (
    <TableComponent<PolicyEntity>
      columns={tableColumnsPolicies}
      data={dataPoliciesMapped}
      paginationOverride={{
        pageIndex,
        pageSize,
      }}
      pageCount={pageCount}
      onPaginationChange={setTablePaginationLocal}
    />
  );
};

export { PoliciesSection };
