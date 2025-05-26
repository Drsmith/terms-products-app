// src/components/Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger Icon (visible on small screens) */}
      <div className="hamburger" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="user-info">
          <img src="https://i.imgur.com/ExdKOOz.png" alt="user" />
          <div>
            <strong>John Andre</strong>
            <p>Storfjord AS</p>
          </div>
        </div>

        <ul className="menu">
          <li>Order</li>
          <li>Our Customers</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
