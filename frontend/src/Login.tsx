import React from "react";
import { useSignInHandler } from "./useAuthorizationHandler";

function useAuthenticationForm(): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  string | null,
  (e: React.FormEvent<HTMLFormElement>) => Promise<void>
] {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [signIn, isLoading] = useSignInHandler(setErrorMessage);

  const handleEmailChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessage("");
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessage("");
      setPassword(e.target.value);
    },
    []
  );

  const handleFormSubmition = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await signIn(email, password);
      } catch (err) {
        console.log(err);
        setErrorMessage((err as Error).message);
      }
    },
    [signIn, email, password]
  );

  return [
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    isLoading,
    errorMessage,
    handleFormSubmition,
  ];
}

export default React.memo(function Login() {
  const [
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    isLoading,
    errorMessage,
    handleFormSubmition,
  ] = useAuthenticationForm();

  return (
    <main className="h-screen grid grid-cols-3">
      <div className="bg-gray-400"></div>

      <div className="col-span-2 p-24 content-center">
        <form className="grid grid-cols-1 gap-4" onSubmit={handleFormSubmition}>
          <h2 className="font-bold">Please sign in to continue</h2>

          <div>
            <h3>
              Login is <pre className="inline-block">admin@example.com</pre>
            </h3>
            <h3>
              Password is <pre className="inline-block">hello</pre>
            </h3>
          </div>

          <label className="block">
            <span>
              Email <sup className="text-red-400">*</sup>
            </span>
            <input
              className="form-input mt-1 block w-full"
              type="email"
              name="login"
              placeholder="jone.doe@example.org"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              required
            />
          </label>

          <label className="block">
            <span>
              Password <sup className="text-red-400">*</sup>
            </span>
            <input
              className="form-input mt-1 block w-full"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              required
            />
          </label>

          <div className="flex justify-center gap-4">
            <img className="h-8 w-8 bg-gray-400" alt="Facebook Logo" />
            <img className="h-8 w-8 bg-gray-400" alt="Google Logo" />
            <img className="h-8 w-8 bg-gray-400" alt="Twitter Logo" />
            <img className="h-8 w-8 bg-gray-400" alt="Just Logo" />
          </div>

          <input
            className="p-2 bg-green-400 rounded cursor-pointer hover:bg-green-300"
            type="submit"
            value="Sign in"
            disabled={isLoading}
          />

          {errorMessage && (
            <span className="text-center text-red-600">{errorMessage}</span>
          )}
        </form>
      </div>
    </main>
  );
});
