import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditExam.css"; // Import CSS file for styling

const EditExam = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/exams/${examId}`)
      .then(response => {
        setExam(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [examId]);

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="main-content">
    <div className="edit-exam-container">
      <h2 className="edit-exam-heading">Edit Exam</h2>
      <form>
        <div className="form-group">
          <label className="label" htmlFor="examName">Exam Name:</label>
          <input className="input" type="text" id="examName" name="examName" defaultValue={exam.examName} />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="examCategory">Exam Category:</label>
          <select className="select" id="examCategory" name="examCategory" defaultValue={exam.examCategory}>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
        <button className="button" type="submit">Save Changes</button>
      </form>
    </div>
    </div>
  );
};

export default EditExam;
