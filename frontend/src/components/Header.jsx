import React from "react";

const Header = ({ handleShowModal }) => {
  return (
    <div className="text-center text-dark">
      <h1>Welcome to Train Trail</h1>
      <p>Online Advanced Ticket Reservation</p>
      <button
        className="btn btn-outline-dark btn-lg text-uppercase font-weight-bold"
        onClick={handleShowModal}
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
