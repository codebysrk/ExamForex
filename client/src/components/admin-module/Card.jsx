// Card.js
import React from "react";
import "./Card.css";

const Card = ({ title, value, icon, color }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="card-content">
        <div className="card-icon">{icon}</div>
        <div className="text">
          <h3 className="card-heading">{title}</h3>
          <p className="card-para">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
