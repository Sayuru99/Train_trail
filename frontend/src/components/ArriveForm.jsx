import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ArriveForm = () => {
  const [arriveData, setArriveData] = useState({
    TrainID: "",
    StationID: "",
  });

  const handleAddArrive = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/trains/addarrive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arriveData),
      });

      if (response.ok) {
        // Handle success
        console.log("Arrive data added successfully");
      } else {
        console.error("Failed to add arrive data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>TrainID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter TrainID"
          value={arriveData.TrainID}
          onChange={(e) => setArriveData({ ...arriveData, TrainID: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>StationID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter StationID"
          value={arriveData.StationID}
          onChange={(e) => setArriveData({ ...arriveData, StationID: e.target.value })}
        />
      </Form.Group>
      <Button variant="primary" className="mt-4" onClick={handleAddArrive}>
        Add Arrive Data
      </Button>
    </Form>
  );
};

export default ArriveForm;
