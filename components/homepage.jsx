import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/homepage.scss";

const Homepage = ({ onLoginClick, onRegisterClick}) => {
  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const loginBtnRef = useRef(null);
  const registerBtnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Panels slide-in animation
      gsap.from(leftRef.current, {
        x: -200,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(rightRef.current, {
        x: 200,
        duration: 1.2,
        delay: 0.2,
        ease: "power4.out",
      });

      // Buttons fade-in
      gsap.fromTo(
        [loginBtnRef.current, registerBtnRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.25,
          delay: 0.6,
          ease: "power3.out",
        }
      );

      // Floating title animation
      gsap.to(leftRef.current.querySelector("h1"), {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Particles animation
      gsap.utils.toArray(".particles span").forEach((p) => {
        gsap.fromTo(
          p,
          {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random(),
            scale: Math.random() + 0.5,
          },
          {
            y: "-=300",
            opacity: 0,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 5,
          }
        );
      });

      // Button hover effect
      const hover = (el) => {
        el.addEventListener("mouseenter", () =>
          gsap.to(el, { scale: 1.08, duration: 0.3 })
        );
        el.addEventListener("mouseleave", () =>
          gsap.to(el, { scale: 1, duration: 0.3 })
        );
      };

      hover(loginBtnRef.current);
      hover(registerBtnRef.current);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="particles">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className="login-page" ref={rootRef}>
        <div className="left-panel" ref={leftRef}>
          <h1>Welcome To Our Project Library</h1>
          <p>Where Ideas Come Alive.</p>
        </div>

        <div className="right-panel" ref={rightRef}>
          <button
            ref={loginBtnRef}
            className="btn login-btn"
            onClick={onLoginClick} // <-- opens the login modal
          >
            Sign in
          </button>

          <button
            ref={registerBtnRef}
            className="btn register-btn"
            onClick={onRegisterClick} // New prop for register  
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
