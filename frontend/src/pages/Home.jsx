import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Hero from "../assets/hero.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import NewsCard from "../components/newsCard";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [showReserveButton, setShowReserveButton] = useState(false);
  const [news, setNews] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [stationNames, setStationNames] = useState([]);
  const [trains, setTrains] = useState([]);
  const [fromStationName, setFromStationName] = useState("");
  const [toStationName, setToStationName] = useState("");
  const [ticketPrice, setTicketPrice] = useState(null);
  const userToken = localStorage.getItem("token");
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
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

  const trainSchedule = [
    {
      trainName: "Express 1",
      departureTime: "08:00 AM",
      arrivalTime: "10:30 AM",
    },
    {
      trainName: "Local 5",
      departureTime: "09:15 AM",
      arrivalTime: "11:45 AM",
    },
    {
      trainName: "SuperFast 12",
      departureTime: "12:30 PM",
      arrivalTime: "02:45 PM",
    },
  ];

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

  const reserveTrain = (
    trainID,
    compartmentID,
    stationID,
    seatID,
    price,
    departureTime,
    startTime
  ) => {
    const bookingData = {
      TrainID: trainID,
      CompartmentID: compartmentID,
      StationID: stationID,
      SeatID: seatID,
      Price: price,
      DepartureTime: departureTime,
      StartTime: startTime,
    };

    axios
      .post("http://localhost:3001/api/reservation/book", bookingData)
      .then((response) => {
        console.log("Booking successful:", response.data);
      })
      .catch((error) => {
        console.error("Booking failed:", error);
      });
  };

  const getTicketPrice = async (fromStationID, toStationID) => {
    try {
      const fromStationID = stationNames.find(
        (station) => station.StationName === fromStation
      )?.StationID;

      const toStationID = stationNames.find(
        (station) => station.StationName === toStation
      )?.StationID;
      console.log(fromStationID);
      console.log(toStationID);
      const url = `http://localhost:3001/api/price/get-price?fromStationID=${fromStationID}&toStationID=${toStationID}`;

      const response = await axios.get(url);
      const price = response.data.price;
      if (price !== null) {
        setTicketPrice(price);
        setShowReserveButton(true);
      } else {
        setTicketPrice(null);
      }
    } catch (error) {
      console.error("Error fetching ticket price:", error);
      setTicketPrice(null);
      setShowReserveButton(false);
    }
  };

  const handleSearchTrains = () => {
    const fromStationID = stationNames.find(
      (station) => station.StationName === fromStation
    )?.StationID;
    const toStationID = stationNames.find(
      (station) => station.StationName === toStation
    )?.StationID;

    setFromStationName(fromStation);
    setToStationName(toStation);

    // console.log(fromStationID, toStationID);
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) =>
        prevIndex === news.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [news]);

  return (
    <div
      className="container-fluid p-0 m-0  d-flex flex-column justify-content-center align-items-center"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <img
        src={Hero}
        alt="train"
        className="img-fluid"
        style={{ width: "100%", height: "auto" }}
      />

      <div
        className="text-center text-dark"
        style={{ position: "absolute", top: "100px", left: "0", right: "0" }}
      >
        <h1>Welcome to Train Trail</h1>
        <p>Online Advanced Ticket Reservation</p>
        <button
          className="btn btn-outline-dark btn-lg text-uppercase font-weight-bold"
          onClick={handleShowModal}
        >
          Get Started
        </button>
        <div className="row" style={{ width: "100%", margin: "0" }}>
        <div className="col-md-6">
          <h2>Train Schedule</h2>
          <Table striped bordered hover style={{ backgroundColor: "#f0f0f0" }}>
            <thead>
              <tr>
                <th>Train Name</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
              </tr>
            </thead>
            <tbody>
              {trainSchedule.map((train, index) => (
                <tr key={index}>
                  <td>{train.trainName}</td>
                  <td>{train.departureTime}</td>
                  <td>{train.arrivalTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-md-6">
          {/* News Cards */}
          <div className="container mt-5" style={{ width: "100%", overflow: "hidden" }}>
            <h2>Latest News</h2>
            <div className="row">
              {news.map((newsItem) => (
                <div className="col-md-6 mb-4" key={newsItem.id}>
                  <div className="news-card" style={{ width: "80%", marginLeft: "5%" }}>
                    <NewsCard
                      title={newsItem.Title}
                      content={newsItem.Content}
                      datePosted={newsItem.DatePosted}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                  <th>{fromStationName} Station Arrival Time</th>
                  <th>{toStationName} Station Arrival Time</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train, index) => (
                  <tr key={index}>
                    <td>{train.TrainName}</td>
                    <td>{train.FromStationArrivalTime}</td>
                    <td>{train.ToStationArrivalTime}</td>
                    <td>
                      <button
                        className="btn btn-light"
                        onClick={() =>
                          getTicketPrice(train.fromStationID, train.toStationID)
                        }
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      )}

      <Modal show={ticketPrice !== null} onHide={() => setTicketPrice(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Ticket Price and Train Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ticketPrice !== null ? (
            <div>
              <p>Ticket Price: ${ticketPrice}</p>
              {showReserveButton && (
                <button className="btn btn-primary" onClick={reserveTrain}>
                  Reserve
                </button>
              )}
            </div>
          ) : (
            <p>Ticket price not found</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
