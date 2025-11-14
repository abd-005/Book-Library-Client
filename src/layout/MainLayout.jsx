import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
