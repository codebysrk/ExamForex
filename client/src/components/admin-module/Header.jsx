// Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation
import "./Header.css";
import profile from "../../assets/profile.jpeg";
import logo from "../../assets/examforex-logo.png";

// User profiles data
const user = {
  username: "Admin",
  email: "admin@example.com",
  avatar: profile,
  role: "Admin",
};

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Get history object for navigation

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    // Perform logout actions here
    // For example, clear session data and redirect to login page
    localStorage.removeItem("user"); // Clear user data from local storage
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />
        <div className="logo-text">ExamForex</div>
      </div>
      <div className="user-profile">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="avatar"
          onClick={toggleModal}
        />
        <span className="username">{user.username}</span>{" "}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className={`modal-custom ${showModal ? "active" : ""}`}>
        <div className="modal-custom-content">
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <div className="modal-custom-header">
            <h2 className="modal-custom-title">Welcome {user.username}</h2>
          </div>
          <div className="modal-custom-body">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="modal-custom-avatar"
            />
            <p>
              <b>Email:</b> {user.email}
            </p>{" "}
            {/* <p>Role: {user.role}</p>{" "} */}
          </div>
          <div className="modal-custom-footer">
            <button className="modal-custom-btn" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
