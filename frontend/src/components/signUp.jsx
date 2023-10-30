import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSignUp = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', userName);

    const userData = {
      email: email,
      password: password,
      username: userName,
    };

    axios
      .post('http://localhost:3001/api/auth/register', userData) 
      .then((response) => {
        console.log('Registration successful. Token:', response.data.token);
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Sign Up</h2>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                placeholder="johnsnow@winterfell.com"
              />
            </div>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={handleUsernameChange}
                placeholder="Snow99"
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                placeholder="123Abc@#"
              />
            </div>
            <button
              onClick={handleSignUp}
              className="btn btn-primary btn-lg btn-block mt-4"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
