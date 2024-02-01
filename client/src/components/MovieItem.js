import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <div
      style={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 5,
        boxShadow: "10px 10px 20px #ccc",
      }}
    >
      <img
        style={{ height: "50%", width: "100%" }}
        src={posterUrl}
        alt={title}
      />
      <div style={{ padding: 16 }}>
        <h5 style={{ marginBottom: 8 }}>{title}</h5>
        <p style={{ fontSize: 12, color: "gray" }}>
          {new Date(releaseDate).toDateString()}
        </p>
      </div>
      <div style={{ padding: 16 }}>
        <Link
          to={`/booking/${id}`}
          style={{
            display: "block",
            width: "100%",
            padding: "8px 0",
            backgroundColor: "#2b2d42",
            color: "white",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: 5,
          }}
        >
          Book
        </Link>
      </div>
    </div>
  );
};

export default MovieItem;
