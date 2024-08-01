import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { handleTokenExpiration } from "./services/auth";

function App() {
  useEffect(() => {
    handleTokenExpiration();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer position="bottom-right" transition={Slide} />
    </>
  );
}

export default App;
