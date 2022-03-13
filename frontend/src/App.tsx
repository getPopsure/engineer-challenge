import React from "react";
import { Outlet, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useAuthorizationHandler,
  useSignOutHandler,
} from "./useAuthorizationHandler";

function useLocationToPageTitleMapper() {
  const location = useLocation();
  const { id } = useParams();

  if (location.pathname.startsWith("/policies")) {
    return "Insurance policies list";
  } else if (location.pathname.startsWith("/policy")) {
    return `Policy "${id}"`;
  } else if (location.pathname.startsWith("/customer")) {
    return `Customer "${id}"`;
  }

  return "";
}

export default React.memo(function App() {
  const [signOut] = useSignOutHandler();
  const [error] = useAuthorizationHandler();
  const pageTitle = useLocationToPageTitleMapper();

  return (
    <>
      <nav className="p-8 border bg-gray-100">
        <div className="flex justify-between items-center">
          <Link to="/policies">
            <img
              className="w-24 h-10 bg-gray-400 rounded text-sm text-center text-white"
              alt="Placeholder for your ad"
            />
          </Link>
          <h2 className="text-lg font-bold uppercase">{pageTitle}</h2>
          <button className="px-4 py-2 bg-red-200 rounded" onClick={signOut}>
            Sign out
          </button>
        </div>
      </nav>

      <main className="pb-10 flex justify-center items-center">
        {error && <h1 className="text-red-400">{error.message}</h1>}
        {!error && <Outlet />}
      </main>
    </>
  );
});
