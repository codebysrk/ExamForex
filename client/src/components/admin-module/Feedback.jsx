import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import "./Users.css";
import axios from "axios";

// Component for rendering rating stars
const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "star filled" : "star"}>
        &#9733;
      </span>
    );
  }
  return <div className="rating-stars">{stars}</div>;
};

const Feedback = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackPerPage] = useState(10);
  const [feedbackData, setFeedbackData] = useState([]);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [examData, setExamData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackResponse = await axios.get("http://localhost:3000/feedbacks/");
        setFeedbackData(feedbackResponse.data);
        
        const userResponse = await axios.get("http://localhost:3000/users/");
        const usersMap = {};
        userResponse.data.forEach(user => {
          usersMap[user._id] = user.name; // Assuming user object has _id and name properties
        });
        setUserData(usersMap);

        const examResponse = await axios.get("http://localhost:3000/exams/");
        const examsMap = {};
        examResponse.data.forEach(exam => {
          examsMap[exam._id] = exam.examName; // Assuming exam object has _id and name properties
        });
        setExamData(examsMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  const handleDelete = (_id) => {
    setDeletingItemId(_id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/feedbacks/${_id}`);
      const updatedData = feedbackData.filter(item => item._id !== _id);
      setFeedbackData(updatedData);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    } finally {
      setDeletingItemId(null);
      setShowDeleteModal(false);
    }
  };

  const indexOfLastUser = currentPage * feedbackPerPage;
  const indexOfFirstUser = indexOfLastUser - feedbackPerPage;
  const filteredData = feedbackData.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === "string"
        ? value.toLowerCase().includes(searchTerm.toLowerCase())
        : typeof value === "number" && value.toString().includes(searchTerm)
    )
  );

  const currentFeedback = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / feedbackPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-content">
      <div className="users-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Exam</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFeedback.map((item, index) => (
              <tr key={index}>
                <td>{userData[item.userID]}</td>
                <td>{examData[item.examID]}</td>
                <td><RatingStars rating={item.rating} /></td>
                <td>{item.comment}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className={`modal-custom ${showDeleteModal ? "active" : ""}`}>
        <div className="modal-custom-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this feedback?</p>
          <div className="modal-buttons">
            <button className="yes" onClick={() => confirmDelete(deletingItemId)}>
              Yes
            </button>
            <button
              className="cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
