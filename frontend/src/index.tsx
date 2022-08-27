import React from "react";
import ReactDOM from "react-dom";

import Policies from "./policies";

import { ContentContext, getLocalisedContent } from './common/context'
import reportWebVitals from "./reportWebVitals";

import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <ContentContext.Provider value ={getLocalisedContent}>
      <Policies />
    </ ContentContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
