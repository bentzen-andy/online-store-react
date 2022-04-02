import React, { useEffect } from "react";
import css from "./App.module.css";

function App() {
  useEffect(() => {
    console.log("useEffect");
    fetch("http://localhost:8080/products", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <div className={css["app"]}>index</div>;
}

export default App;
