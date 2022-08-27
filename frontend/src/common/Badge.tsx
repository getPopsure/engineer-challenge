
const Badge = ({ status, styles }: { status: String, styles: any }) => {
  const { textColor, backgroundColor } = styles;
  const className = `inline-block rounded-full	py-1 px-4 font-semibold text-xs ${textColor} ${backgroundColor}`;

  return <p className={className}>{status}</p>
}

export default Badge;