import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    const userData = {
      email,
      password,
    };
    axios.post('http://localhost:3001/api/auth/login', userData)
    .then((response) => {
      console.log('Sign-in successful. Token:', response.data.token);

      localStorage.setItem('token', response.data.token);

      navigate('/home');
    })
    .catch((error) => {
      console.error('Sign-in failed:', error);
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Sign In</h2>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={handleSignIn}
              className="btn btn-primary btn-lg btn-block mt-4"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
