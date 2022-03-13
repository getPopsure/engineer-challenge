import React from "react";

export enum InsuranceTypes {
  HOUSEHOLD = "HOUSEHOLD",
  LIABILITY = "LIABILITY",
  HEALTH = "HEALTH",
}

export type InsuranceTypeProps = {
  type: InsuranceTypes;
};

export default React.memo(function InsuranceType(props: InsuranceTypeProps) {
  switch (props.type) {
    case InsuranceTypes.LIABILITY:
      // I have a good taste for colors
      return (
        <span className="py-2 px-1 text-yellow-700 border rounded text-center">
          Liability 💼
        </span>
      );
    case InsuranceTypes.HOUSEHOLD:
      return (
        <span className="py-2 px-1 text-yellow-300 border rounded text-center">
          Household 🏠
        </span>
      );
    case InsuranceTypes.HEALTH:
      return (
        <span className="py-2 px-1 text-green-300 border rounded text-center">
          Health 🚑
        </span>
      );
  }
});
