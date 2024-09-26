import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/Footer"

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
