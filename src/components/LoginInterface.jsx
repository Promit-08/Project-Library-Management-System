import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
import "../styles/LoginInterface.scss";

const LoginInterface = ({ onClose, onSwitchToRegister, onLoginSuccess }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate(); // ✅ ADD THIS

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Animation
  useEffect(() => {
    gsap.from(modalRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({
        email,
        password,
      });

      // ✅ Save login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", res.data.token); // adjust if needed

      // ✅ Call parent (optional)
      if (onLoginSuccess) onLoginSuccess(res.data);

      // ✅ RESET FORM
      setEmail("");
      setPassword("");

      // ✅ REDIRECT TO DASHBOARD
      navigate("/dashboard");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal" ref={modalRef}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Sign in</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <span onClick={onSwitchToRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginInterface;