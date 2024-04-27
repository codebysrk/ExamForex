import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAddLine } from 'react-icons/ri';
import { AiOutlineArrowDown, AiOutlineDelete } from 'react-icons/ai'; // Import AiOutlineDelete icon
import axios from 'axios';
import './Exams.css'; // Import your CSS file

const ExamsTable = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to access navigation Navigate

  useEffect(() => {
    // Fetch exams data from your backend API
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/exams'); // Adjust the API endpoint accordingly
        setExams(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const toggleQuestions = (examId) => {
    setExams((prevExams) =>
      prevExams.map((exam) => {
        if (exam._id === examId) {
          return {
            ...exam,
            showQuestions: !exam.showQuestions,
          };
        }
        return exam;
      })
    );
  };

  const handleCreateExam = () => {
    // Navigate to the create exam page
    navigate('/admin/create-exam'); // Replace '/create-exam' with your desired path
  };

  const handleDeleteExam = async (examId) => {
    try {
      // Send a delete request to your backend API to delete the exam
      await axios.delete(`http://localhost:3000/exams/${examId}`);
      // Remove the deleted exam from the state
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== examId));
    } catch (error) {
      console.error('Error deleting exam:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='main-content'>
      <div className="create-exam-container">
        <button className="create-exam-button" onClick={handleCreateExam}>
          <RiAddLine /> Add Exam
        </button>
      </div>
      <div className="exams-container1">
        {exams.map((exam) => (
          <div key={exam._id} className="exam-card">
            <img src={exam.examImage} alt='exam-icon' />
            <div className="exam-details">
              <h3>{exam.examName}</h3>
              <p><b>Course:</b> <i>{exam.examCategory.categoryName}</i></p>
              {/* {exam.examCategory.categoryImage && (
                <img src={exam.examCategory.categoryImage} alt={exam.examCategory.categoryName} className="exam-category-img" />
              )} */}
              <p><b>Duration:</b> {exam.duration} min</p>
              {/* {exam.showQuestions ? (
                <ul className="questions-list">
                  {exam.questions.map((question, index) => (
                    <li key={index}>{question.text}</li>
                  ))}
                </ul>
              ) : (
                <button onClick={() => toggleQuestions(exam._id)} className="show-questions-button">
                  <AiOutlineArrowDown /> Show Questions ({exam.questions.length})
                </button>
              )} */}
              <p>Questions: {exam.questions.length}</p>
              <button onClick={() => handleDeleteExam(exam._id)} className="delete-button">
                <AiOutlineDelete /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamsTable;
