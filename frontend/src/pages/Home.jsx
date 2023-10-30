import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../assets/hero.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import NewsCard from "../components/newsCard";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [news, setNews] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [stationNames, setStationNames] = useState([]);
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseTrainModal = () => {
    setShowTrainModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/news/")
      .then((response) => {
        setNews(response.data.news);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });

    axios
      .get("http://localhost:3001/api/stations/")
      .then((response) => {
        // console.log(response);
        setStationNames(response.data.stations);
      })
      .catch((error) => {
        console.error("Error fetching station names:", error);
      });
  }, []);

  const handleSearchTrains = () => {
    const fromStationID = stationNames.find(
      (station) => station.StationName === fromStation
    )?.StationID;
    const toStationID = stationNames.find(
      (station) => station.StationName === toStation
    )?.StationID;

    console.log(fromStationID, toStationID);
    if (fromStationID && toStationID) {
      axios
        .get(
          `http://localhost:3001/api/trains/trains-between-stations?fromStation=${fromStationID}&toStation=${toStationID}`
        )
        .then((response) => {
          // console.log(response);
          setTrains(response.data.trains);
          handleCloseModal();
          setShowTrainModal(true);
        })
        .catch((error) => {
          console.error("Error fetching trains:", error);
        });
    } else {
      console.error("Invalid station names selected");
    }
  };

  return (
    <div
      className="container-fluid p-0 m-0 bg-primary d-flex flex-column justify-content-center align-items-center"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <button
        className="btn btn-light btn-sm position-absolute top-0 end-0 m-3"
        onClick={handleLogout}
        style={{ zIndex: 9999 }}
      >
        Logout
      </button>

      <img
        src={Hero}
        alt="train"
        className="img-fluid"
        style={{ width: "100%", height: "auto" }}
      />

      <div
        className="text-center text-dark"
        style={{ position: "absolute", top: "20px", left: "0", right: "0" }}
      >
        <h1>Welcome to Train Trail</h1>
        <p>Online Advanced Ticket Reservation</p>
        <button
          className="btn btn-outline-dark btn-lg text-uppercase font-weight-bold"
          onClick={handleShowModal}
        >
          Get Started
        </button>
        <div className="container mt-5">
          <h2>Latest News</h2>
          <div className="row">
            {news.map((newsItem) => (
              <div className="col-md-6 mb-4" key={newsItem.id}>
                <NewsCard
                  title={newsItem.Title}
                  content={newsItem.Content}
                  datePosted={newsItem.DatePosted}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Find Train</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fromStation">
              <Form.Label>From Station</Form.Label>
              <Form.Control
                as="select"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
              >
                <option value="">Select a station</option>
                {stationNames.map((station) => (
                  <option key={station.StationID} value={station.StationName}>
                    {station.StationName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="toStation">
              <Form.Label>To Station</Form.Label>
              <Form.Control
                as="select"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
              >
                <option value="">Select a station</option>
                {stationNames.map((station) => (
                  <option key={station.StationID} value={station.StationName}>
                    {station.StationName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSearchTrains}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container mt-5">
        <h2>Available Trains</h2>
        <ul>
          {trains.map((train) => (
            <li key={train.TrainName}>{train.TrainName}</li>
          ))}
        </ul>
      </div>
      {trains.length > 0 && (
        <Modal
          show={showTrainModal}
          onHide={handleCloseTrainModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Available Trains</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Train Name</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train, index) => (
                  <tr key={index}>
                    <td>{train.TrainName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Home;
