import React from "react";
import Form from "react-bootstrap/Form";

const SearchForm = ({ stationNames, fromStation, toStation, onSearch, onFromStationChange, onToStationChange }) => {
  return (
    <Form>
      <Form.Group controlId="fromStation">
        <Form.Label>From Station</Form.Label>
        <Form.Control as="select" value={fromStation} onChange={onFromStationChange}>
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
        <Form.Control as="select" value={toStation} onChange={onToStationChange}>
          <option value="">Select a station</option>
          {stationNames.map((station) => (
            <option key={station.StationID} value={station.StationName}>
              {station.StationName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
