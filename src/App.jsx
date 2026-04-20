import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

const getToken = () => localStorage.getItem("token");

const getRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded?.role;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};

// ✅ Public Route (redirect if logged in)
const PublicRoute = ({ children }) => {
  const role = getRole();

  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "user") return <Navigate to="/dashboard" replace />;

  return children;
};

// ✅ Protected Route (dashboard access only if logged in)
const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) return <Navigate to="/" replace />;

  try {
    jwtDecode(token);
    return children;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH PAGE */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD (placeholder for now) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;