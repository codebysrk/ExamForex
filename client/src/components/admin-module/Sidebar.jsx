// Sidebar.js
import React from "react";
import { useLocation } from "react-router-dom";
import { FiHome, FiUser } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { FaSheetPlastic } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Define an array of sidebar links with their paths and icons
  const sidebarLinks = [
    { path: "/admin/home", icon: <FiHome />, text: "Dashboard" },
    { path: "/admin/users", icon: <FiUser />, text: "Users" },
    { path: "/admin/category", icon: <BiCategory />, text: "Courses" },
    { path: "/admin/exams", icon: <FaSheetPlastic />, text: "Exams" },
    { path: "/admin/feedback", icon: <MdFeedback />, text: "Feedback" },
    // { path: "/admin/test", icon: <MdFeedback />, text: "Feedback" }
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {sidebarLinks.map((link, index) => (
          <li key={index} className={location.pathname === link.path ? "active" : ""}>
            <Link to={link.path}>
              {link.icon}
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
