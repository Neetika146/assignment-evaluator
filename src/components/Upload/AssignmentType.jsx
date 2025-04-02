import React from "react";
import { useNavigate } from "react-router-dom";
import "./AssignmentType.css"; // Import the external CSS

const AssignmentType = () => {
  const navigate = useNavigate();

  return (
    <div className="assignment-container">
      <h1 className="assignment-title">Choose Assignment Type</h1>

      <button
        className="assignment-button typed"
        onClick={() => navigate("/upload-assignment")}
      >
        📄 Typed Assignment
      </button>

      <button
        className="assignment-button handwritten"
        onClick={() => navigate("/upload-assignment-handwritten")}
      >
        ✍️ Handwritten
      </button>
    </div>
  );
};

export default AssignmentType;