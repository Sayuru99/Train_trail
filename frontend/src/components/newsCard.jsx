import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'aos/dist/aos.css';
import AOS from 'aos';

const NewsCard = ({ title, content, datePosted }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const formattedDate = new Date(datePosted).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="mb-4" data-aos="fade-up" style={{ background: '#f0f0f0', padding: '1rem' }}>
      <Card.Body>
        <Card.Title className="h4" style={{ color: 'blue' }}>{title}</Card.Title>
        <Card.Text style={{ color: 'green' }}>{content}</Card.Text>
        <p className="text-muted" style={{ color: 'red' }}>Date Posted: {formattedDate}</p>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
