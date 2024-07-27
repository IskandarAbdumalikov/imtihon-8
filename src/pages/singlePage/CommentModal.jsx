import React, { memo, useState } from "react";
import Modal from "react-modal";
import "./commentModule.scss";

const CommentModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text: [comment], rating: [rating], user: [userName] });
    setComment("");
    setRating(0);
    setUserName("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="comment-modal"
      overlayClassName="comment-modal-overlay"
    >
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Full Name</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default memo(CommentModal);
