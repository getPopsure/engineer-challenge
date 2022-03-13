import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const link = new HttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Policy: {
        keyFields: ["policyId"],
      },
      Customer: {
        keyFields: ["customerId"],
      },
    },
  }),
});

function Policy() {
  return <h1>Policy page</h1>;
}

function User() {
  return <h1>User page</h1>;
}

const Login = React.lazy(() => import("./Login"));
const App = React.lazy(() => import("./App"));
const PolicyTablePage = React.lazy(() => import("./PolicyTablePage"));

function Suspencer({ element }: { element: JSX.Element }) {
  return <React.Suspense fallback={<>...</>}>{element}</React.Suspense>;
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Suspencer element={<Login />} />} />
          <Route element={<Suspencer element={<App />} />}>
            <Route
              path="/policies"
              element={<Suspencer element={<PolicyTablePage />} />}
            />
            <Route
              path="/policy/:id"
              element={<Suspencer element={<Policy />} />}
            />
            <Route path="/user/:id" element={<User />} />
          </Route>
          <Route path="*" element={<Navigate to={"/policies"} />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
