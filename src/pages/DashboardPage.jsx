import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import DashboardHome from "../components/Dashboard/DashboardHome";
import MyProjectsPage from "./Dashboard/MyProjectsPage";
import UploadProjectPage from "./Dashboard/UploadProjectPage";
import ProfilePage from "./Dashboard/ProfilePage";

const DashboardPage = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="my-projects" element={<MyProjectsPage />} />
        <Route path="upload-project" element={<UploadProjectPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
};

export default DashboardPage;
