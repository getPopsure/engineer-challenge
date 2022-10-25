import logo from 'assets/logo.svg';

export const Navbar = () => (
  <div className="relative bg-white">
    <div className="w-full px-4 sm:px-6">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <span className="sr-only">Workflow</span>
            <img className="h-6 w-auto sm:h-8" src={logo} alt="Feather logo" />
          </a>
        </div>
      </div>
    </div>
  </div>
);
