import React, { useState, useEffect } from "react";
import "../../styles/Dashboard/topbar.scss";

const Topbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
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

    fetchUser();
  }, []);

  return (
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <div className="user-info">

        {/* ✅ USERNAME */}
        <span>{user?.username || "User"}</span>

        {/* ✅ AVATAR */}
        <img
          src={
            user?.avatar
              ? `http://localhost:5000${user.avatar}`
              : "https://i.pravatar.cc/40"
          }
          alt="avatar"
        />
      </div>
    </header>
  );
};

export default Topbar;