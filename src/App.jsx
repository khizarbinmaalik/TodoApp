import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Header } from "./components";
function App() {
  const themeFromStore = useSelector((state) => state.theme.theme);

  useEffect(() => {
    let html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(themeFromStore);
  }, [themeFromStore]);


  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
