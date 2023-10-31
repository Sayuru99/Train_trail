import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Row, Col } from "react-bootstrap";

const teamMembers = [
  {
    name: "Tharusha Rantharu",
    position: "System Analyst",
    Description: "Tharusha is our System Analyst, with a keen eye for detail and a deep understanding of the technical aspects of our platform. He plays a crucial role in optimizing our systems for peak performance and efficiency",
    photo:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
  {
    name: "Sayuru De Alwis",
    position: "Software Engineer",
    Description: "Sayuru is our Software Engineer, responsible for crafting the code that powers our platform. With a knack for problem-solving and experience, Sayuru ensures that our application runs smoothly and effectively.",
    
    photo:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
  {
    name: "Pamidu Perera",
    position: "Project Manager",
    Description: "Pamidu is our Project Manager, guiding our team through the development process. His leadership and organizational skills are instrumental in keeping our projects on track and ensuring they meet your needs.",
    photo:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
  {
    name: "Kaveesha Nanayakkara",
    position: "Software Enginner",
    Description: "Kaveesha is another valued member of our Software Engineering team. Her coding expertise and dedication to quality contribute to the robustness of our software, making it reliable for your ticketing needs.",
    photo:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
];

const About = () => {
  return (
    <div className="container py-4">
      <h2>About Railway Ticketing</h2>
      <p>
        Welcome to Train Trail, your one-stop destination for advanced railway
        ticket reservation. At Train Trail, we're passionate about making your
        train journey comfortable, convenient, and hassle-free. Our mission is
        to provide you with a seamless ticket booking experience, ensuring that
        your travel plans are executed smoothly.
        <br></br>
        <br></br>
        With a user-friendly interface, we offer a wide range of services to
        meet all your ticketing needs. Whether you're a frequent traveler or a
        first-time passenger, our platform is designed to cater to everyone.
        We're committed to delivering the best services, from finding the
        perfect train route to securing your seat, all in a few simple clicks.
        <br></br>
        <br></br>
        Our team is dedicated to providing you with the latest information,
        real-time ticket availability, and competitive prices, ensuring you make
        the most informed decisions for your journey. We understand that every
        traveler has unique requirements, and we're here to accommodate them.
        <br></br>
        <br></br>
        Train Trail is not just a ticket booking platform; it's your travel
        companion. We're excited to have you on board, and we look forward to
        being a part of your travel adventures. Thank you for choosing Train
        Trail for all your railway ticketing needs.
      </p>

      <h2 className="pt-4 pb-2">Meet Our Team</h2>
      <div className="team-members-container">
        <Carousel className="mb-4">
          {teamMembers.map((member, index) => (
            <Carousel.Item key={index}>
              <div className="team-member">
                <Row>
                  <Col xs={12} md={4}>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col xs={12} md={8}>
                    <div className="team-member-details">
                      <h3>{member.name}</h3>
                      <p style={{color:"#808080"}}>{member.position}</p>
                      <p>{member.Description}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default About;
