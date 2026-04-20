import React, { useEffect, useState } from "react";
import "../../styles/Dashboard/profile.scss";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [locationName, setLocationName] = useState("Fetching location...");

  // 🔥 FETCH USER DATA
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // 📍 GEOLOCATION (your existing code)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });

          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((res) => res.json())
            .then((data) => {
              setLocationName(
                data.address.city || data.address.town || "Unknown"
              );
            });
        },
        () => setLocationName("Location not available")
      );
    }
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-grid">

        {/* LEFT PROFILE CARD */}
        <div className="profile-card">
          <div className="avatar-wrapper">
            <img src="https://i.pravatar.cc/200" alt="User Avatar" />
            <span className="online-dot"></span>
          </div>

          <h2>{user?.username || "Loading..."}</h2>
          <span className="username">@{user?.username || "user"}</span>


          <div className="divider" />

          <div className="stats">
            <div>
              <h3>24</h3>
              <p>Projects</p>
            </div>
            <div>
              <h3>1.2k</h3>
              <p>Followers</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">
          <div className="settings-card">
            <h3>Profile Settings</h3>

            <div className="settings-row">
              <div>
                <label>Email Address</label>
                <input
                  type="text"
                  value={user?.email || ""}
                  disabled
                />
              </div>

              <div>
                <label>Role</label>
                <input
                  type="text"
                  value={user?.role || "user"}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="map-card">
            <h3>Location (Google Maps)</h3>

            {coords.lat && coords.lng ? (
              <iframe
                title="location"
                src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                loading="lazy"
              ></iframe>
            ) : (
              <p>Loading map...</p>
            )}

            <span className="location-badge">
              Current Location: {locationName}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;