import React from "react";
import Table from "react-bootstrap/Table";

const TrainList = ({ trains, fromStationName, toStationName, onGetTicketPrice }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Train Name</th>
          <th>{fromStationName} Station Arrival Time</th>
          <th>{toStationName} Station Arrival Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {trains.map((train, index) => (
          <tr key={index}>
            <td>{train.TrainName}</td>
            <td>{train.FromStationArrivalTime}</td>
            <td>{train.ToStationArrivalTime}</td>
            <td>
              <button onClick={() => onGetTicketPrice(train.fromStationID, train.toStationID)}>
                Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TrainList;
