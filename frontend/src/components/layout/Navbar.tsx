import logo from "../../assets/logo.svg";

const Navbar = () => (
  <div className="relative bg-white">
    <div className="w-full px-4 sm:px-6">
      <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <span className="sr-only">Workflow</span>
            <img className="w-auto h-6 sm:h-8" src={logo} alt="Feather logo" />
          </a>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav className="items-center justify-end hidden md:flex lg:w-0">
          <a
            href="/"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Policies
          </a>
          <a
            href="/"
            className="ml-8 text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900"
          >
            Sign in
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-gray-700"
          >
            Sign up
          </a>
        </nav>
      </div>
    </div>

    <div className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
      <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
        <div className="px-5 pt-5 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <img
                className="w-auto h-6 sm:h-8"
                src={logo}
                alt="Feather logo"
              />
            </div>
            <div className="-mr-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              >
                <span className="sr-only">Close menu</span>

                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-6">
            <nav className="grid gap-y-8">
              <a
                href="/"
                className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
                <span className="ml-3 text-base font-medium text-gray-900">
                  {" "}
                  Policies{" "}
                </span>
              </a>
            </nav>
          </div>
        </div>
        <div className="px-5 py-6 space-y-6">
          <div>
            <a
              href="/"
              className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700"
            >
              {" "}
              Sign up{" "}
            </a>
            <p className="mt-6 text-base font-medium text-center text-gray-500">
              <a href="/" className="text-gray-600 hover:text-gray-500">
                {" "}
                Sign in{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export { Navbar };
