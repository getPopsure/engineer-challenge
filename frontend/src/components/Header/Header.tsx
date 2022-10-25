interface Header {
  children: string;
}

export const Header = ({ children }: Header) => {
  return <h1 className="text-3xl font-bold text-gray-900 mb-2">{children}</h1>;
};
