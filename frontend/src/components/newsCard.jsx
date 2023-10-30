import React from 'react';
import Card from 'react-bootstrap/Card';

const NewsCard = ({ title, content, datePosted }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <p>Date Posted: {datePosted}</p>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
