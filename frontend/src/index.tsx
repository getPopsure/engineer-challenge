import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

import App from "./App";

const link = new HttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function PolicyTable() {
  return (
    <>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>Col 1</th>
            <th>Col 2</th>
          </tr>
        </thead>
      </table>
    </>
  );
}

function Policy() {
  return <h1>Policy page</h1>;
}

function User() {
  return <h1>User page</h1>;
}

const Login = React.lazy(() => import("./Login"));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route element={<App />}>
            <Route path="/policies" element={<PolicyTable />} />
            <Route path="/policy/:id" element={<Policy />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="*" element={<PolicyTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
