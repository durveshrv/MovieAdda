import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieItem from "../components/MovieItem";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await response.json();
        setMovies(data.map((entry) => entry.show));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", margin: "auto", marginTop: 20 }}>
      <div style={{ margin: "auto", width: "80%", height: "40vh", padding: 20 }}>
        <img
          src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
          alt="Brahmastra"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div style={{ padding: 20, margin: "auto", textAlign: "center" }}>
        <h4>Latest Releases</h4>
      </div>
      <div
        style={{
          margin: "auto",
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {movies &&
          movies.slice(0, 4).map((movie, index) => (
            <MovieItem
              id={movie.id}
              title={movie.name}
              posterUrl={movie.image && movie.image.medium}
              releaseDate={movie.premiered}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
