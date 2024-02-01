import React from "react";
import { Link } from "react-router-dom";

const CradLayout = ({ title, summary, premiered, image, id }) => {
  return (
    <div
      style={{
        width: 250,
        height: 320,
        borderRadius: 5,
        boxShadow: "10px 10px 20px #ccc",
        overflow: "hidden",
        margin: "10px",
        boxSizing: "border-box",
      }}
    >
      <img
        style={{
          height: "50%",
          width: "100%",
          objectFit: "cover",
        }}
        src={image && image.medium}
        alt={title}
      />
      <div
        style={{
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <h5 style={{ marginBottom: "8px" }}>{title}</h5>
        <p style={{ color: "text.secondary" }}>
          {new Date(premiered).toDateString()}
        </p>
      </div>
      <div style={{ padding: "10px", boxSizing: "border-box" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2b2d42",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <Link
            to={`/booking/${id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            Book Now
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CradLayout;
