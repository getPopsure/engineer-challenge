import React from "react";

export enum InsuranceStatuses {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  DROPPED_OUT = "DROPPED_OUT",
}

export type InsuranceStatusProps = {
  status: InsuranceStatuses;
};

export default React.memo(function InsturanceStatus(
  props: InsuranceStatusProps
) {
  switch (props.status) {
    case InsuranceStatuses.PENDING:
      return (
        <div className="w-24 px-2 py-1 bg-yellow-300 text-center rounded">
          Pending
        </div>
      );
    case InsuranceStatuses.ACTIVE:
      return (
        <div className="w-24 px-2 py-1 bg-green-300 text-center rounded">
          Active
        </div>
      );
    case InsuranceStatuses.CANCELLED:
      return (
        <div className="w-24 px-2 py-1 bg-gray-300  text-center rounded">
          Cancelled
        </div>
      );
    case InsuranceStatuses.DROPPED_OUT:
      return (
        <div className="w-24 px-2 py-1 bg-red-300 text-center rounded">
          Dropped out
        </div>
      );
  }
});
