import React, { useState } from 'react';
import SignUp from '../components/signUp';
import SignIn from '../components/signIn';

const AuthPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignupClick = () => {
    setShowSignUp(true);
  };

  const handleSigninClick = () => {
    setShowSignUp(false);
  };

  return (
    <div className="container-fluid bg-primary vh-100 d-flex justify-content-center align-items-center">
      <div className="card text-center p-4" style={{ backgroundColor: 'white', width: '75%', display: 'flex' }}>
        <div style={{ flex: 1 }} className='float-start'>
          <div>
            <button className="btn btn-light btn-lg text-uppercase font-weight-bold" onClick={handleSignupClick}>Sign Up</button>
            |
            <button className="btn btn-light btn-lg text-uppercase font-weight-bold" onClick={handleSigninClick}>Sign In</button>
          </div>
          {showSignUp ? <SignUp /> : <SignIn />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
