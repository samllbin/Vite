import React, { useEffect } from "react";
import Logo from "./assets/logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    console.log(Logo);
  });
  return (
    <>
      {/* <img src={Logo} /> */}
      <Logo></Logo>
    </>
  );
}

export default App;
