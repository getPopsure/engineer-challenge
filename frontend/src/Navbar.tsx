import { MouseEventHandler, useState } from 'react';
import logo from './assets/logo.svg'

const Navbar = () => {
  const[isOpen, setIsOpen] = useState(false); 

const MenuOpened=  () => ( <path  fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>)

const MenuClosed = () => (<path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>)
return (
  <div className="w-full fixed bg-white px-4 sm:px-6">
    <div className=" ">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <span className="sr-only">Workflow</span>
            <img className="h-6 w-auto" src={logo} alt="Feather logo" />
          </a>
        </div>
      <div className="flex align-start">
        <nav className={isOpen ? 'block sm:block md: items-center px-2 pt-2 pb-4 sm:p-0 sm:flex  ' : 'hidden  md: items-center sm:block px-2 pt-2 pb-4 sm:p-0 sm:flex '} >
          <a
            href="/"
            className="text-base block font-medium text-gray-500 hover:text-gray-900"
          >Policies
          </a>
          <a
            href="/"
            className=" mt-4 md:mt-0 md:ml-8 block whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >Sign in
          </a>
          <a
            href="/"
            className="mt-4 md:mt-0 md:ml-8 block whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700"
          >
            Sign up
          </a>
        </nav>
        <div className="sm:hidden">
          <button
            type="button"
            onClick={(event: any ) => setIsOpen((isOpen ? false : true ))}
            className="block text-gray-500 hover:text-white focus:text-black focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              { isOpen ? MenuOpened() : MenuClosed() }
            </svg>
          </button>
        </div>
        </div>
        </div>
      </div>
    </div>
);
}

export default Navbar;
