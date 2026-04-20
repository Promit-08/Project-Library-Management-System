import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// check auth
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// check admin
const isAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.role === "admin";
  } catch {
    return false;
  }
};

// ✅ PROTECTED ROUTE (for nested routes)
export const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

// ✅ ADMIN ROUTE
export const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/" replace />;
  return isAdmin() ? children : <Navigate to="/dashboard" replace />;
};