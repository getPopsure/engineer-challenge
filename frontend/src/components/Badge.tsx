import React from "react";
import { PolicyEntityStatusEnum } from "../types/generated";

interface BadgeProps {
  status: PolicyEntityStatusEnum;
}

const getBadgeColors = (status: PolicyEntityStatusEnum) => {
  const badgeColors: {
    [k in PolicyEntityStatusEnum]: {
      textColor: string;
      backgroundColor: string;
    };
  } = {
    ACTIVE: { textColor: "text-green-500", backgroundColor: "bg-green-100" },
    PENDING: { textColor: "text-yellow-500", backgroundColor: "bg-yellow-100" },
    CANCELLED: { textColor: "text-red-500", backgroundColor: "bg-red-100" },
    DROPPED_OUT: { textColor: "text-red-500", backgroundColor: "bg-red-100" },
  };

  return badgeColors[status];
};

const Badge = React.memo(({ status }: BadgeProps) => {
  const { textColor, backgroundColor } = getBadgeColors(status);
  const className = `inline-block rounded-full py-1 px-4 font-semibold text-xs ${textColor} ${backgroundColor}`;

  return <p className={className}>{status}</p>;
});

export { Badge };
