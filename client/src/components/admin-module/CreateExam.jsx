import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateExam.css"; // Importing custom styles
import { useNavigate } from 'react-router-dom';

const CreateExam = () => {
  const [examData, setExamData] = useState({
    examName: "",
    examCategory: "",
    questions: [],
    duration: 0,
    examImage: null
  });

  const [examCategories, setExamCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exam categories when component mounts
    axios.get("http://localhost:3000/exam-categories")
      .then(response => {
        setExamCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching exam categories:", error);
      });
  }, []);

  const handleExamChange = (e) => {
    const { name, value, files } = e.target;
  
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setExamData(prevState => ({
          ...prevState,
          [name]: base64Image,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setExamData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleQuestionChange = (questionIndex, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...examData.questions];
    updatedQuestions[questionIndex][name] = value;
    setExamData(prevState => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleCorrectOptionChange = (questionIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...examData.questions];
    updatedQuestions[questionIndex].correctOptionIndex = parseInt(value, 10);
    setExamData(prevState => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...examData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setExamData(prevState => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const addQuestion = () => {
    setExamData(prevState => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        { text: "", options: ["", "", "", ""], correctOptionIndex: 0 },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/exams", examData);
      console.log("Exam created successfully:", response.data);
      // Redirect to some success page or show a success message
      navigate('/admin/exams');
    } catch (error) {
      console.error("Error creating exam:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <div className="main-content">
      <div className="exams-containerr">
        <h2 className="exams-title">Create Exam</h2>
        <form onSubmit={handleSubmit} className="exams-form">
          <div className="exams-form-item">
            <label htmlFor="examName" className="exams-label">Exam Name</label>
            <input
              type="text"
              id="examName"
              name="examName"
              value={examData.examName}
              onChange={handleExamChange}
              required
              className="exams-input"
              placeholder="Enter exam name"
            />
          </div>
          <div className="exams-form-item">
            <label htmlFor="examCategory" className="exams-label">Course</label>
            <select
              id="examCategory"
              name="examCategory"
              value={examData.examCategory}
              onChange={handleExamChange}
              className="exams-select"
            >
              <option value="">Select course</option>
              {examCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="exams-form-item">
            <label htmlFor="duration" className="exams-label">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={examData.duration}
              onChange={handleExamChange}
              required
              className="exams-input"
              placeholder="Enter duration"
            />
          </div>
          <div className="exams-form-item">
            <label htmlFor="examImage" className="exams-label">Exam Image (File)</label>
            <input
              type="file"
              id="examImage"
              name="examImage"
              accept="image/*"
              onChange={handleExamChange}
              required
              className="exams-input"
            />
          </div>
          {/* Questions */}
          <h3 className="exams-title-questions">Questions</h3>
          {examData.questions.map((question, index) => (
            <div key={index} className="exams-question">
              <label htmlFor={`question-${index}`} className="exams-label">Question {index + 1}</label>
              <input
                type="text"
                id={`question-${index}`}
                name="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="exams-input"
                placeholder="Enter question"
              />
              <label className="exams-label">Options</label>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="exams-option">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                    required
                    className="exams-input"
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>
              ))}
              <label htmlFor={`correctOption-${index}`} className="exams-label">Correct Option</label>
              <select
                id={`correctOption-${index}`}
                value={question.correctOptionIndex}
                onChange={(e) => handleCorrectOptionChange(index, e)}
                required
                className="exams-select"
              >
                {question.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>{`Option ${optionIndex + 1}`}</option>
                ))}
              </select>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="exams-button exams-add-button">
            Add Question
          </button>
          <button type="submit" className="exams-button exams-submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
