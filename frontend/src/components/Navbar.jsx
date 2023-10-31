import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container-fluid p-4 m-0 align-items-center">
      <Navbar bg="light" expand="lg" variant="light">
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", fontSize: "32px" }}>Train Trail</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {userToken ? (
              <Button
                variant="light"
                onClick={handleLogout}
                style={{ zIndex: 9999, fontWeight: "bold" }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/gallery" style={{ fontWeight: "bold" }}>
                  Gallery
                </Nav.Link>
                <Nav.Link as={Link} to="/about" style={{ fontWeight: "bold" }}>
                  About Us
                </Nav.Link>
                <Nav.Link to="/auth" as={Link} style={{ fontWeight: "bold" }}>
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
