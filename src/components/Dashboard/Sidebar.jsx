import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiUpload,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import "../../styles/Dashboard/sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/", { replace: true });
  };

  const menuItems = [
    { name: "Home", path: "/dashboard", icon: <FiHome /> },
    { name: "My Projects", path: "/dashboard/my-projects", icon: <FiFolder /> },
    { name: "Upload Project", path: "/dashboard/upload-project", icon: <FiUpload /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FiUser /> },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo">
        <span className="logo-icon">PL</span>
        <span>ProjectLibrary</span>
      </div>

      {/* Menu */}
      <nav className="menu">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? "active" : ""}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="logout" onClick={handleLogout}>
        <FiLogOut />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
