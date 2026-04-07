import React, { useEffect, useState } from "react";
import "../../styles/Dashboard/profile.scss";

const ProfilePage = () => {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [locationName, setLocationName] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });

          // Optional: Convert coordinates to human-readable location
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((res) => res.json())
            .then((data) => {
              setLocationName(data.address.city || data.address.town || "Unknown");
            });
        },
        (err) => {
          console.error(err);
          setLocationName("Location not available");
        }
      );
    } else {
      setLocationName("Geolocation not supported");
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

          <h2>User Name</h2>
          <span className="username">@abc</span>

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
                <input type="text" value="abc@gmail.com" disabled />
              </div>

              <div>
                <label>Developer Level</label>
                <input type="text" value="Senior Fullstack Engineer" disabled />
              </div>
            </div>
          </div>

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
