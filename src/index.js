import React from "react";
import ReactDOM from "react-dom/client";
import pages from "./pages";
import "./index.css";

const { Dashboard, Homepage } = pages;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Dashboard />);
