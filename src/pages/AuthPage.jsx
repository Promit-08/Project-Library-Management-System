import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Homepage from "../components/homepage";
import LoginInterface from "../components/LoginInterface";
import RegisterInterface from "../components/RegisterInterface";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  // After login, set auth and go to dashboard
  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setShowLogin(false);
    navigate("/dashboard");
  };

  const handleRegisterSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setShowRegister(false);
    navigate("/dashboard");
  };

  // Switch modals
  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <>
      <Homepage
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
      />

      {showLogin && (
        <LoginInterface
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={switchToRegister}
          onLoginSuccess={handleLoginSuccess} // ✅ new prop
        />
      )}

      {showRegister && (
        <RegisterInterface
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={switchToLogin}
          onRegisterSuccess={handleRegisterSuccess} // ✅ new prop
        />
      )}
    </>
  );
};

export default AuthPage;
