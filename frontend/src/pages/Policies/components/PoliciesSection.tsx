import { PaginationState } from "@tanstack/table-core";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "~/src/components/Badge";
import { TableComponent } from "~/src/components/Table/TableComponent";
import { useAppDispatch, useAppSelector } from "~/src/store/hooks";
import { PolicyEntity } from "~/src/types/generated";
import { PaginatedResponse } from "~/src/types/tempTypes";
import {
  mapPoliciesToTableData,
  generateTableColumnsPolicies,
} from "./PoliciesSection.table-utils";
import { clearFilters, setTablePagination } from "./policiesSlice";

type PoliciesSectionProps = {
  dataPolicies: PaginatedResponse<PolicyEntity>;
};

const PoliciesSection = ({ dataPolicies }: PoliciesSectionProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // Get pagination data
  const { filters, search } = useAppSelector(
    ({ policiesView }) => policiesView
  );

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

  // Generate table columns
  const tableColumnsPolicies = useMemo(() => {
    return generateTableColumnsPolicies({ t });
  }, [t]);

  const pageCount = useMemo(
    () => Math.ceil(dataPolicies.pagination.total / pageSize),
    [pageIndex, pageSize, dataPolicies]
  );

  const isFiltered = useMemo(() => {
    return (
      filters.insuranceType.length > 0 ||
      filters.insuranceStatus.length > 0 ||
      search.provider ||
      search.customerName
    );
  }, [filters, search]);

  return (
    <>
      {isFiltered && (
        <div className="flex gap-10 h-16 bg-gray-100 rounded-xl mx-1">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              dispatch(clearFilters());
            }}
          >
            {t("filters.clear")} <span className="font-bold pl-1">x</span>
          </div>
          <div className="flex">
            {search.customerName && search.customerName !== "" && (
              <div className="flex items-center gap-2">
                <span className="text-gray-800 text-sm font-thin flex items-center">
                  {t("filters.customer")}
                </span>
                <div className="flex border">{search.customerName}</div>
              </div>
            )}
          </div>
          <div className="flex">
            {search.provider && search.provider !== "" && (
              <div className="flex items-center gap-2">
                <span className="text-gray-800 text-sm font-thin flex items-center">
                  {t("filters.provider")}
                </span>
                <div className="flex border">{search.provider}</div>
              </div>
            )}
          </div>

          <div className="flex">
            {filters.insuranceStatus.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm font-thin">
                  {t("filters.statuses")}
                </span>
                <div className="flex">
                  {filters.insuranceStatus.map((status) => {
                    return <Badge key={status} status={status} />;
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            {filters.insuranceType.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm font-thin">
                  {" "}
                  {t("filters.types")}{" "}
                </span>
                <div className="flex">
                  {filters.insuranceType.map((type) => {
                    return (
                      <div
                        className="inline-block rounded-full py-1 px-4 font-semibold text-xs bg-gray-200"
                        key={type}
                      >
                        {type}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
    </>
  );
};

export { PoliciesSection };
