import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Feedback = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(feedback);
    setFeedback('');
  };

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="feedback">Feedback:</label>
      <textarea 
        id="feedback"
        value={feedback}
        onChange={handleChange}
        placeholder="Leave your feedback here..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

Feedback.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Feedback;