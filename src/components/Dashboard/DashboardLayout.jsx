import React, { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useLocation } from "react-router-dom"; // ✅ import useLocation
import { gsap } from "gsap";

import "../../styles/Dashboard/dashboardLayout.scss";

const DashboardLayout = () => {
  const outletRef = useRef(null);
  const location = useLocation(); // Detect route changes

  useEffect(() => {
    if (outletRef.current) {
      // Animate new page in
      gsap.fromTo(
        outletRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [location]); // Run every time the route changes

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <div ref={outletRef} className="outlet-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
