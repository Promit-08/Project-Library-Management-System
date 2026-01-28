import React from "react";
import "../../styles/Dashboard/profile.scss";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-card">
        <img src="https://i.pravatar.cc/150" alt="Avatar" />
        <h3>John Doe</h3>
        <p>Email: john@example.com</p>
        <button>Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage;
