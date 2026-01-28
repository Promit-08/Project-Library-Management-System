import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/RegisterInterface.scss";

const RegisterInterface = ({ onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.from(modalRef.current, { opacity: 0, y: -50, duration: 0.8, ease: "power3.out" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ simulate register success
    onRegisterSuccess();
  };

  return (
    <div className="register-overlay">
      <div className="register-modal" ref={modalRef}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" required />
            <label>First Name</label>
          </div>
          <div className="input-group">
            <input type="text" required />
            <label>Last Name</label>
          </div>
          <div className="input-group">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input type="password" required />
            <label>Password</label>
          </div>
          <div className="input-group">
            <input type="password" required />
            <label>Confirm Password</label>
          </div>
          <button type="submit" className="register-btn">Sign Up</button>
        </form>
        <p className="login-text">
          Already have an account?{" "}
          <span onClick={onSwitchToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterInterface;
