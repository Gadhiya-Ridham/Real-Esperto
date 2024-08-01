import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/pages/home/Home";
import About from "../components/pages/About/About";
import Properties from "../components/pages/property/properties";
import Contact from "../components/pages/contact/contact";
import Property from "../components/pages/property/property-tab/property";
import BookingPage from "../components/pages/booking/booking";
import LoginPage from "../components/pages/Login/loginPage";
import PayDone from "../components/pages/payDone/payDone";
import Dashboard from "../components/pages/dashboard/Dashboard";
import Add1 from "../components/pages/dashboard/add-listnigs/Add_1";
import Add2 from "../components/pages/dashboard/add-listnigs/Add_2";
import Add3 from "../components/pages/dashboard/add-listnigs/Add_3";
import Add4 from "../components/pages/dashboard/add-listnigs/Add_4";
import Add5 from "../components/pages/dashboard/add-listnigs/Add_5";
import Add6 from "../components/pages/dashboard/add-listnigs/Add_6";
import Add7 from "../components/pages/dashboard/add-listnigs/Add_7";
import Add8 from "../components/pages/dashboard/add-listnigs/Add_8";
import SearchPage from "../components/header/searchPage";
import Preview from "../components/pages/dashboard/add-listnigs/previewProperty/preview";
import AdminPanel from "../components/AdminPanel/AdminPanel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact="true" path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Properties" element={<Properties />} />
      <Route path="/Property/:id" element={<Property />} />
      <Route path="/BookingPage/:id/:activeState" element={<BookingPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Pay-done/:id" element={<PayDone />} />
      <Route path="/dashboard/:tabNumber" element={<Dashboard />} />
      <Route path="/add-Property-1" element={<Add1 />} />
      <Route path="/add-Property-2" element={<Add2 />} />
      <Route path="/add-Property-3" element={<Add3 />} />
      <Route path="/add-Property-4" element={<Add4 />} />
      <Route path="/add-Property-5" element={<Add5 />} />
      <Route path="/add-Property-6" element={<Add6 />} />
      <Route path="/add-Property-7" element={<Add7 />} />
      <Route path="/add-Property-8" element={<Add8 />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/admin/:tabNumber" element={<AdminPanel />} />
    </Routes>
  );
};

export default AppRoutes;
