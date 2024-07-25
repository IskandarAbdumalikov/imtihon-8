import React, { useState } from "react";
import Modal from "react-modal";
import "./commentModule.scss";

Modal.setAppElement("#root");

const CommentModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = () => {
    const commentData = {
      firstName,
      lastName,
      comment,
      commentRating: rating,
    };
    onSubmit(commentData);
    onRequestClose();
    setFirstName("");
    setLastName("");
    setRating("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="commentModal"
      overlayClassName="commentModalOverlay"
    >
      <span className="close" onClick={onRequestClose}>
        &times;
      </span>
      <h2>Write a Review</h2>
      <label>First Name</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label>Comment</label>
      <textarea
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <label>Rating</label>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Select rating</option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
};

export default CommentModal;
