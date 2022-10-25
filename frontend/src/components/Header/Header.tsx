interface HeaderProps {
  children: string;
}

export const Header = ({ children }: HeaderProps) => {
  return <h1 className="text-3xl font-bold text-gray-900 mb-2">{children}</h1>;
};
