import React, { useEffect } from "react";
import css from "./App.module.css";

function App() {
  useEffect(() => {
    console.log("useEffect");
    // fetch products from back end
  }, []);

  return <div className={css["app"]}>index</div>;
}

export default App;
