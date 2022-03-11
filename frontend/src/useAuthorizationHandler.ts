import React from "react";
import { useLocation, useNavigate } from "react-router";

export function useAuthorizationHandler(): [Error | null] {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const abortController = new AbortController();

    // If server is unavailable show an error to user
    // If server is available:
    //  If /check-auth is successful then redirect from /login page or do nothing
    //  Otherwise redirect to /login page

    // TODO: store path before redirection.
    // TODO: handle situation when user is authorized but /login page is not redirecting them

    fetch("/api/check-auth", {
      credentials: "include",
      signal: abortController.signal,
    })
      .then((r) => {
        if (r.status > 500) {
          console.error(r.statusText);
          setError(
            new Error(
              "Something went wrong. Please reload the page and try again!"
            )
          );
        } else if (r.ok) {
          if (location.pathname === "/login") {
            navigate("/policies", { replace: true });
          }
        } else {
          navigate("/login", {
            replace: true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });

    return () => abortController.abort();
  }, [error, location.pathname, location.state, navigate]);

  return [error];
}

export function useSignInHandler(
  setErrorMessage: (message: string) => void
): [(email: string, password: string) => Promise<void>, boolean] {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const signIn = React.useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);

      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();

        setIsLoading(false);
        setErrorMessage(message);
      } else {
        navigate("/policies");
      }
    },
    [setErrorMessage, navigate]
  );

  return [signIn, isLoading];
}

export function useSignOutHandler(): [() => Promise<void>] {
  const navigate = useNavigate();

  const signOut = React.useCallback(async () => {
    const response = await fetch("/api/signout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      navigate("/login");
    }
  }, [navigate]);

  return [signOut];
}
