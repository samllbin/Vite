import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import fib from "virtual:fib";
import env from "virtual:env";

console.log(env);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
alert(`结果: ${fib(10)}`);
