import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Logout from "./components/logout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import Booking from "./pages/Booking";
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/logout" element={<Logout />} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/booking/:id" element={<Booking/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
