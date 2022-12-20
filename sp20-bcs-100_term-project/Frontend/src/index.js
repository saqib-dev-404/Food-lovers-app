import React from "react";
import ReactDOM from "react-dom/client";
import "./Layout/main/index.css";
import App from "./Layout/main/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
