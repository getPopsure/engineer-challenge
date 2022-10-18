import { Header } from "./Header";
import { Navbar } from "./Navbar";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => (
  <div>
    <Navbar />
    <div className="flex flex-col items-center w-full p-8">
      <div className="flex flex-col justify-start w-full max-w-6xl">
        <Header />
        <div className="flex flex-col w-full ">{children}</div>
      </div>
    </div>
  </div>
);

export { BaseLayout };
