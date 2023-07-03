import { useState } from 'react';
import PropTypes from 'prop-types';

export const Feedback = ({ onSubmit }: any) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(feedback);
    setFeedback('');
  };

  const handleChange = (event: any) => {
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
