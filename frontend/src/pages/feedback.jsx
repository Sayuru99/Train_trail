import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'aos/dist/aos.css';
import AOS from 'aos';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    PassengerID: 1,
    Content: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: value,
    });
  };

  const submitFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/feedback/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.status === 201) {
        console.log('Feedback added successfully');
      } else {
        console.error('Failed to add feedback');
      }
    } catch (error) {
      console.error('Error while submitting feedback:', error);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='p-4'>
      <h2 className="mt-4">Submit Feedback</h2> {/* Add Bootstrap margin top class */}
      <form data-aos="fade-up" data-aos-duration="1000"> {/* Apply AOS.js animation */}
        <div className="form-group">
          <label htmlFor="content">Feedback:</label>
          <textarea
            id="content"
            name="Content"
            value={feedbackData.Content}
            onChange={handleInputChange}
            className="form-control" // Add Bootstrap form-control class
            rows="4"
          ></textarea>
        </div>
        <button type="button" className="btn btn-primary mt-4" onClick={submitFeedback}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
