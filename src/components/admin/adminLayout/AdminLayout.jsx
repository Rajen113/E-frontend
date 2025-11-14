import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/ Sidebar";
import Footer from "../footer/Footer";
import "./AdminLayout.css";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="layout-wrapper">
        <Sidebar />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
