import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/LoginInterface.scss";

const LoginInterface = ({ onClose, onSwitchToRegister, onLoginSuccess }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.from(modalRef.current, { opacity: 0, y: -50, duration: 0.8, ease: "power3.out" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ simulate login success
    onLoginSuccess();
  };

  return (
    <div className="login-overlay">
      <div className="login-modal" ref={modalRef}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit" className="login-btn">Sign In</button>
        </form>
        <p className="signup-text">
          Don't have an account?{" "}
          <span onClick={onSwitchToRegister}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default LoginInterface;
