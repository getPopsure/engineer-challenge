import React from "react"
import { Status } from "../types"

interface BadgeProps {
  status: Status
}

const getBadgeColors = (status: Status) => {
  const badgeColors: { [k in Status]: {
    textColor: string,
    backgroundColor: string
  } } = {
    [Status.ACTIVE]: { textColor: 'tc-green-100', backgroundColor: 'bg-green-100' },
    [Status.PENDING]: { textColor: 'tc-yellow-600', backgroundColor: 'bg-yellow-100' },
    [Status.CANCELLED]: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
    [Status.DROPPED_OUT]: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
  }

  return badgeColors[status]
}

const Badge = ({ status }: BadgeProps) => {
  const { textColor, backgroundColor } = getBadgeColors(status);
  const className = `inline-block rounded-full	py-1 px-4 font-semibold text-xs ${textColor} ${backgroundColor}`;

  return <p className={className}>{status.replace("_", " ")}</p>
}

export default React.memo(Badge);