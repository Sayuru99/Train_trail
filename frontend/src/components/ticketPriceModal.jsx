import React from "react";
import Modal from "react-bootstrap/Modal";

const TicketPriceModal = ({ ticketPrice, onClose }) => {
  return (
    <Modal show={ticketPrice !== null} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ticket Price</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ticketPrice !== null ? (
          <p>Ticket Price: ${ticketPrice}</p>
        ) : (
          <p>Ticket price not found</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TicketPriceModal;
