import React from "react";
import ReactDOM from "react-dom/client";
import Tickets from "./components/Tickets";

$(document).ready(()=>{
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <Tickets />)
})