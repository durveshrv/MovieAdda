import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [gndr, setGnd] = useState('Male');
    const [isMounted, setIsMounted] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setIsMounted(false);
        };
    }, []);

    const Submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3001/register`, {
                name,
                email,
                phoneno,
                password,
                gndr,
            });
            console.log(response.data);
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <section className='showcase2 mx-auto w-50' >
                <div className="showcase-form card px-3 py-4" style={{ height: '600px' }}>
                    <h2>Register</h2>
                    <form onSubmit={Submit}>
                        <div className="mb-3">
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="fullname" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email1" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email1" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneno" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="phoneno" placeholder="Phone Number" onChange={(e) => setPhoneno(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="male"
                                    value="Male"
                                    checked={gndr === 'Male'}
                                    onChange={() => setGnd('Male')}
                                    required
                                />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="female"
                                    value="Female"
                                    checked={gndr === 'Female'}
                                    onChange={() => setGnd('Female')}
                                    required
                                />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="prefer-not-to-say"
                                    value="Prefer not to say"
                                    checked={gndr === 'Prefer not to say'}
                                    onChange={() => setGnd('Prefer not to say')}
                                    required
                                />
                                <label className="form-check-label" htmlFor="prefer-not-to-say">Prefer not to say</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <br />
                </div>
            </section>
        </div>
    );
}

export default Register;
