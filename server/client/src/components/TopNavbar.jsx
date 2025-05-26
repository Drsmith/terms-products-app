import React, { useState } from "react";
import gbFlag from "../assets/gb.png";
import seFlag from "../assets/se.png";
import diamond from "../assets/diamond.png";
import "./TopNavbar.css";

const TopNavbar = ({ onLanguageChange, currentLang }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="top-navbar">
      <div className="navbar-inner">
        <div className="logo-container">
          <img src={diamond} alt="Diamond Logo" className="diamond-icon" />
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Order</a>
          <a href="#">Our Customers</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="language-switcher">
          <div onClick={() => setShowDropdown(!showDropdown)} className="lang-label">
            <img
              src={currentLang === "sv" ? seFlag : gbFlag}
              alt="Lang Flag"
              className="flag-icon"
            />
          </div>
          {showDropdown && (
            <div className="lang-dropdown">
              <div onClick={() => { onLanguageChange("sv"); setShowDropdown(false); }}>
                <img src={seFlag} alt="SE Flag" className="flag-icon" /> Svenska
              </div>
              <div onClick={() => { onLanguageChange("en"); setShowDropdown(false); }}>
                <img src={gbFlag} alt="GB Flag" className="flag-icon" /> English
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;