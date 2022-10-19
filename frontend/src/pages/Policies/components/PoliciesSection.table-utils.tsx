import { createColumnHelper } from "@tanstack/table-core";
import { Badge } from "~/src/components/Badge";
import { capitalizeString } from "~/src/utils/string-utils";
import Select from "react-select";
import {
  PolicyEntity,
  PolicyEntityInsuranceTypeEnum,
} from "~/src/types/generated";
import { useAppDispatch, useAppSelector } from "~/src/store/hooks";
import { setInsuranceType } from "./policiesSlice";
import { useMemo } from "react";

const columnHelper = createColumnHelper<PolicyEntity>();

const insuranceTypeOptions = Object.values(PolicyEntityInsuranceTypeEnum).map(
  (insuranceType) => {
    return {
      value: insuranceType,
      label: capitalizeString(insuranceType),
    };
  }
);

export const tableColumnsPolicies = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => <span>#</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor(
    (row) => `${row?.customer?.firstName} ${row?.customer?.lastName}`,
    {
      id: "customerName",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <span>Name</span>,
    }
  ),
  columnHelper.accessor("provider", {
    header: () => <span>Provider</span>,
    cell: (info) => <>{info.getValue()}</>,
  }),
  columnHelper.accessor("insuranceType", {
    header: () => <span>Type</span>,
    cell: (info) => <div>{capitalizeString(info.getValue())}</div>,
    meta: {
      filterComponent: () => {
        const dispatch = useAppDispatch();

        // Get data from redux store
        const { insuranceType: insuranceTypeFilters } = useAppSelector(
          ({ policiesView }) => policiesView.filters
        );

        // Get only selected options
        const insuranceTypeSelectedOptions = useMemo(() => {
          if (!insuranceTypeFilters) return [];
          return insuranceTypeOptions.filter(({ value }) =>
            insuranceTypeFilters.includes(value)
          );
        }, [insuranceTypeFilters]);

        return (
          <div className="flex w-full">
            <Select
              className="w-56 h-12 pt-1 basic-single"
              classNamePrefix="select"
              value={insuranceTypeSelectedOptions}
              isMulti
              isSearchable
              name="color"
              options={insuranceTypeOptions}
              onChange={(selectedOptions) => {
                const filteredValues = selectedOptions?.map(
                  ({ value }) => value
                );
                if (filteredValues) {
                  dispatch(setInsuranceType(filteredValues));
                }
              }}
            />
          </div>
        );
      },
    },
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: (info) => (
      <div>
        <Badge status={info.getValue()} />
      </div>
    ),
  }),
];

export const mapPoliciesToTableData = (policies: PolicyEntity[]) => {
  return policies;
};
