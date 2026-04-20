import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { registerUser } from "../api/auth";
import "../styles/RegisterInterface.scss";

const RegisterInterface = ({
  onClose,
  onSwitchToLogin,
  onRegisterSuccess,
}) => {
  const modalRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gsap.from(modalRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ Password check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({
        username: `${firstName} ${lastName}`,
        email,
        password,
      });

      // Pass backend response to parent
      onRegisterSuccess(res.data);

      // reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-overlay">
      <div className="register-modal" ref={modalRef}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="input-group">
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>First Name</label>
          </div>

          {/* Last Name */}
          <div className="input-group">
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Last Name</label>
          </div>

          {/* Email */}
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          {/* Password */}
          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
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