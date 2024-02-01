import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const Booking = () => {
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [userData, setUserData] = useState(null); // State to store user data
  const { id } = useParams();
  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await axios.get('http://localhost:3001/about', {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token'),
        },
        credentials: "include",
      });
      const data = await res.data;
      setUserData(data); // Set user data in state
    } catch (err) {
      if (err) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/api/bookings/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ ...inputs, movieId: id, userId: userData._id }), // Include user ID in the request
      });
  
      if (response.ok) {
        // If the response status is OK (200-299), show success alert
        alert('Movie booked successfully!');
      } else {
        // If there's an issue during booking, show error alert
        alert('Unable to book movie. Please try again.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      // If there's an exception, show error alert
      alert('An error occurred. Please try again.');
    }
  };  

  return (
    <div>
      {movie && (
        <Fragment>
          <h4 style={{ fontFamily: 'fantasy', textAlign: 'center' }}>
            Book Tickets Of Movie: {movie.name}
          </h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                width: "50%",
                marginRight: "auto",
              }}
            >
              <img
                width="80%"
                height="300px"
                src={movie.image && movie.image.medium}
                alt={movie.name}
              />
              <div style={{ width: "80%", marginTop: "1rem", padding: "0.5rem" }}>
                <p>{movie.summary}</p>
                <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
                  Release Date: {new Date(movie.premiered).toDateString()}
                </p>
              </div>
            </div>
            <div style={{ width: "50%", paddingTop: "1rem" }}>
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    padding: "1.25rem",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>Seat Number</label>
                  <input
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type="number"
                    style={{ margin: "0.25rem 0", padding: "0.5rem" }}
                  />
                  <label>Booking Date</label>
                  <input
                    name="date"
                    type="date"
                    style={{ margin: "0.25rem 0", padding: "0.5rem" }}
                    value={inputs.date}
                    onChange={handleChange}
                  />
                  <button type="submit" style={{ marginTop: "1rem" }}>
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
