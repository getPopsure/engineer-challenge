import React from "react";
import { Outlet } from "react-router";
import {
  useAuthorizationHandler,
  useSignOutHandler,
} from "./useAuthorizationHandler";

export default React.memo(function App() {
  const [signOut] = useSignOutHandler();
  const [error] = useAuthorizationHandler();

  return (
    <>
      <nav className="p-8 border bg-gray-200">
        <div className="flex justify-between items-center">
          <img className="w-24 h-10" alt="Placeholder for your ad" />
          <h2>Login</h2>
          <button className="px-4 py-2 bg-red-400 rounded" onClick={signOut}>
            Sign out
          </button>
        </div>
      </nav>

      <main className="flex justify-center items-center">
        {error && <h1 className="text-red-400">{error.message}</h1>}
        {!error && <Outlet />}
      </main>
    </>
  );
});
