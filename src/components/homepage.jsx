import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/homepage.scss";

const Homepage = ({ onLoginClick, onRegisterClick }) => {
  const navigate = useNavigate();

  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
        } else {
          if (decoded.role === "admin") {
            navigate("/dashboard/admin");
          } else {
            navigate("/dashboard");
          }
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  // 🎨 GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -200,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(rightRef.current, {
        x: 200,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="login-page" ref={rootRef}>
      <div className="left-panel" ref={leftRef}>
        <h1>Welcome To Our Project Library</h1>
        <p>Where Ideas Come Alive.</p>
      </div>

      <div className="right-panel" ref={rightRef}>
        <button className="btn login-btn" onClick={onLoginClick}>
          Sign in
        </button>

        <button className="btn register-btn" onClick={onRegisterClick}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Homepage;