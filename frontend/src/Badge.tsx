export type Status = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'DROPPED_OUT'

interface BadgeProps {
  status: Status
}

const getBadgeColors = (status: Status) => {
  const badgeColors: { [k in Status]: {
    textColor: string,
    backgroundColor: string
  } } = {
    ACTIVE: { textColor: 'tc-green-100', backgroundColor: 'bg-green-100' },
    PENDING: { textColor: 'tc-yellow-600', backgroundColor: 'bg-yellow-100' },
    CANCELLED: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
    DROPPED_OUT: { textColor: 'tc-red-100', backgroundColor: 'bg-red-100' },
  }

  return badgeColors[status]
}

const Badge = ({ status }: BadgeProps) => {
  const { textColor, backgroundColor } = getBadgeColors(status);
  const className = `inline-block rounded-full	py-1 px-4 font-semibold text-xs ${textColor} ${backgroundColor}`;

  return <p className={className}>{status}</p>
}

export default Badge;