import React, { useState } from "react";

import Homepage from "../components/homepage";
import LoginInterface from "../components/LoginInterface";
import RegisterInterface from "../components/RegisterInterface";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ✅ LOGIN SUCCESS (ONLY STORE TOKEN)
  const handleLoginSuccess = (data) => {
    if (!data?.token) return console.error("No token received");

    localStorage.setItem("token", data.token);
    setShowLogin(false);

    // ❌ NO navigation here
  };

  // ✅ REGISTER SUCCESS (ONLY STORE TOKEN)
  const handleRegisterSuccess = (data) => {
    if (!data?.token) return console.error("No token received");

    localStorage.setItem("token", data.token);
    setShowRegister(false);

    // ❌ NO navigation here
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
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterInterface
          onClose={() => setShowRegister(false)}
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default AuthPage;