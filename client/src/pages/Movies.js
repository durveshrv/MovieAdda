import React, { useEffect, useState } from "react";
import CradLayout from "../components/CradLayout";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setMovies(data.map((entry) => entry.show)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(movies);
  }, []);

  return (
    <div style={{ margin: "auto", marginTop: 32 }}>
      <h4
        style={{
          margin: "auto",
          width: "40%",
          padding: 16,
          backgroundColor: "#900C3F",
          color: "white",
          textAlign: "center",
        }}
      >
        All Movies
      </h4>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginTop: 32,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {movies &&
          movies.map((show, index) => (
            <CradLayout
              key={index}
              id={show.id}
              title={show.name}
              releaseDate={show.premiered}
              posterUrl={show.image && show.image.medium}
              description={show.summary}
            />
          ))}
      </div>
    </div>
  );
};

export default Movies;
