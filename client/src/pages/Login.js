import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import logo from "../assets/images/logo.png";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const URL = `http://localhost:3001/login`;
            const response = await axios.post(URL, {
                email,
                password
            });
            const json = response.data;

            if (json.success) {
                localStorage.setItem('auth-token', json.token);
                navigate('/');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred during login. Please try again.');
            }
        }
    };

    return (
        <>
            <section className="showcase2 w-50 mx-auto">
                <div className="showcase-form card px-3 py-3">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck1"
                            />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                    <br />
                    <div>
                        <Link to="forgot.php">Forgot Password?</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
