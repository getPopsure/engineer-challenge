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

const LoginPage = React.lazy(() => import("./LoginPage"));
const App = React.lazy(() => import("./App"));
const PolicyTablePage = React.lazy(() => import("./PolicyTablePage"));
const PolicyPage = React.lazy(() => import("./PolicyPage"));
const CustomerPage = React.lazy(() => import("./CustomerPage"));

function Suspencer({ element }: { element: JSX.Element }) {
  return <React.Suspense fallback={<>...</>}>{element}</React.Suspense>;
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Suspencer element={<LoginPage />} />}
          />
          <Route element={<Suspencer element={<App />} />}>
            <Route
              path="/policies"
              element={<Suspencer element={<PolicyTablePage />} />}
            />
            <Route
              path="/policy/:id"
              element={
                <Suspencer element={<Suspencer element={<PolicyPage />} />} />
              }
            />
            <Route
              path="/customer/:id"
              element={<Suspencer element={<CustomerPage />} />}
            />
          </Route>
          <Route path="*" element={<Navigate to={"/policies"} />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
