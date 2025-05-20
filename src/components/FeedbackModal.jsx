import React, { useState } from 'react';
import Modal from './Modal';

export default function FeedbackModal({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim()) {
      console.log('Feedback submitted:', feedback);
      setSubmitted(true);
      setFeedback('');
      setTimeout(onClose, 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-center">שלח פידבק</h2>

      {submitted ? (
        <p className="text-green-600 text-center">תודה על המשוב שלך!</p>
      ) : (
        <div className="flex flex-col space-y-4">
          <textarea
            className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="כתוב כאן את המשוב שלך..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            dir="rtl"
          ></textarea>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            שלח
          </button>
        </div>
      )}
    </Modal>
  );
}
