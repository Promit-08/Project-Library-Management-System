import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../components/Dashboard/DashboardLayout";
import DashboardHome from "../components/Dashboard/DashboardHome";
import MyProjectsPage from "./Dashboard/MyProjectsPage";
import UploadProjectPage from "./Dashboard/UploadProjectPage";
import ProfilePage from "./Dashboard/ProfilePage";
import AdminDashboard from "../components/Dashboard/AdminDashboard";

import { AdminRoute } from "../routes/ProtectedRoute";

const DashboardPage = () => {
  return (
    <Routes>

      {/* MAIN LAYOUT */}
      <Route path="/" element={<DashboardLayout />}>

        {/* HOME */}
        <Route index element={<DashboardHome />} />

        {/* USER ROUTES */}
        <Route path="my-projects" element={<MyProjectsPage />} />
        <Route path="upload-project" element={<UploadProjectPage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* ADMIN */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Route>

    </Routes>
  );
};

export default DashboardPage;