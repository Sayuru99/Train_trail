import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Container, Row, Col, Modal } from "react-bootstrap";
import { PencilSquare } from 'react-bootstrap-icons';
import ArriveForm from "../../components/ArriveForm";

const AdminPanel = () => {
  const [trains, setTrains] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [showUserModal, setShowUserModal] = useState(false); 
  const [newTrain, setNewTrain] = useState({
    TrainName: "",
    RouteID: "",
    Type: "",
    CreatedOnDate: new Date().toISOString(),
    UpdatedOnDate: new Date().toISOString(),
    Status: "Active",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);

  const fetchUserList = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users/");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error("Failed to fetch user list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTrainList();
    fetchUserList();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleSaveUserEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/update/${selectedUser.UserID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.ok) {
        fetchUserList();
        setShowUserModal(false);
      } else {
        console.error("Failed to update the user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchTrainList = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/trains/");
      if (response.ok) {
        const data = await response.json();
        setTrains(data.trains);
      } else {
        console.error("Failed to fetch train list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddTrain = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/trains/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrain),
      });

      if (response.ok) {
        fetchTrainList();
        setNewTrain({
          TrainName: "",
          RouteID: "",
          Type: "",
          CreatedOnDate: new Date().toISOString(),
          UpdatedOnDate: new Date().toISOString(),
          Status: "Active",
        });
      } else {
        console.error("Failed to add a train");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditTrain = (train) => {
    setSelectedTrain(train); 
    setShowModal(true); 
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/trains/update/${selectedTrain.TrainID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedTrain),
      });
  
      if (response.ok) {
        fetchTrainList();
        setShowModal(false);
      } else {
        console.error("Failed to update the train");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };  

  return (
    <div>
    <Container>
      <h1 className="mt-4">Train Dashboard</h1>
      <Row>
        <Col md={6}>
          <div className="mt-4">
            <h2>Add Train</h2>
            <Form>
              <Form.Group>
                <Form.Label>Train Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Train Name"
                  value={newTrain.TrainName}
                  onChange={(e) =>
                    setNewTrain({ ...newTrain, TrainName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Route ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Route ID"
                  value={newTrain.RouteID}
                  onChange={(e) =>
                    setNewTrain({ ...newTrain, RouteID: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Type"
                  value={newTrain.Type}
                  onChange={(e) =>
                    setNewTrain({ ...newTrain, Type: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleAddTrain}
                className="mt-4"
              >
                Add Train
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <div className="mt-4">
            <h2>Train List</h2>
            <ListGroup>
              {trains.map((train) => (
                <ListGroup.Item key={train.TrainID}>
                {train.TrainName}
                <Button
                  variant="warning"
                  className="ml-2 m-2"
                  onClick={() => handleEditTrain(train)}
                >
                  <PencilSquare size={20} />
                </Button>
              </ListGroup.Item>
              
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
      <h2>Add Arrivals</h2>
      <ArriveForm />
    </Container>

<Modal show={showModal} onHide={() => setShowModal(false)}>
<Modal.Header closeButton>
  <Modal.Title>Edit Train</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group>
      <Form.Label>Train Name</Form.Label>
      <Form.Control
        type="text"
        value={selectedTrain?.TrainName}
        onChange={(e) =>
          setSelectedTrain({ ...selectedTrain, TrainName: e.target.value })
        }
      />
    </Form.Group>
    {/* Add similar Form.Group elements for other train details */}
  </Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={() => setShowModal(false)}>
    Close
  </Button>
  <Button variant="primary" onClick={handleSaveEdit}>
    Save Changes
  </Button>
</Modal.Footer>
</Modal>
<h2>User List</h2>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.UserID}>
            {user.Username}
            <Button
              variant="warning"
              className="ml-2 m-2"
              onClick={() => handleEditUser(user)}
            >
              <PencilSquare size={20} />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      
      {/* User Details Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser?.Username}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, Username: e.target.value })
                }
              />
            </Form.Group>
            {/* Add similar Form.Group elements for other user details */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUserEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
