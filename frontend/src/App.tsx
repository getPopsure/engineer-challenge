import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export function useAuthorizationChecker(): [boolean, boolean, Error | null] {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const abortController = new AbortController();

    fetch("/api/check-auth", {
      credentials: "include",
      signal: abortController.signal,
    }).then((r) => {
      setIsLoading(false);
      setIsAuthenticated(r.ok);

      if (r.status > 500) {
        console.error(r.statusText);
        setError(
          new Error(
            "Something went wrong. Please reload the page and try again!"
          )
        );
      }
    });

    return abortController.abort;
  }, []);

  return [isLoading, isAuthenticated, error];
}

export function useAuthorizationHandler(): [boolean, boolean, Error | null] {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, isAuthenticated, error] = useAuthorizationChecker();

  if (!error && !isAuthenticated) {
    if (location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }

  return [isLoading, isAuthenticated, error];
}

export default React.memo(function App() {
  const [isLoading, isAuthenticated, error] = useAuthorizationHandler();

  return (
    <>
      <nav className="p-8 border bg-gray-200">
        <div className="flex justify-between items-center">
          <img className="w-8 h-8" alt="Placeholder for your ad" />
          <h2>Login</h2>
          {!isAuthenticated && (
            <button className="px-4 py-2 bg-green-400 rounded">Sign in</button>
          )}
          {isAuthenticated && (
            <button className="px-4 py-2 bg-red-400 rounded">Sign out</button>
          )}
        </div>
      </nav>

      <main className="h-screen flex justify-center items-center">
        {error && <h1 className="text-red-400">{error.message}</h1>}
        {isLoading && <h1>Loading...</h1>}
        {!error && !isLoading && <Outlet />}
      </main>
    </>
  );
});
