import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import styles from "./assets/styles/App.scss";
ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<img />}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
