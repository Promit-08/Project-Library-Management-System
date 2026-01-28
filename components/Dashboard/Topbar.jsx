import React, { useState, useEffect } from "react";
import "../../styles/Dashboard/topbar.scss";

const Topbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // activate glassy effect after scrolling 20px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <div className="user-info">
        <span>User</span>
        <img src="https://i.pravatar.cc/40" alt="avatar" />
      </div>
    </header>
  );
};

export default Topbar;
