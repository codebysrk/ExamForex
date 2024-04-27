import React, { useState, useEffect } from "react";
import { FiUsers, FiMessageCircle, FiBook, FiLayers } from "react-icons/fi";
import "./main.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";
import axios from "axios";

const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [examList, setExamList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:3000/users/");
        setUserList(userResponse.data);

        const categoryResponse = await axios.get("http://localhost:3000/exam-categories/");
        setCategoryList(categoryResponse.data);

        const examResponse = await axios.get("http://localhost:3000/exams/");
        setExamList(examResponse.data);

        const feedbackResponse = await axios.get("http://localhost:3000/feedbacks/");
        setFeedbackList(feedbackResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    {
      title: "Total Users",
      value: userList.length,
      icon: <FiUsers />,
      color: "#FFA500",
    },
    {
      title: "Total Feedback",
      value: feedbackList.length,
      icon: <FiMessageCircle />,
      color: "#FF6347",
    },
    {
      title: "Total Exams",
      value: examList.length,
      icon: <FiBook />,
      color: "#20B2AA",
    },
    {
      title: "Total Courses",
      value: categoryList.length,
      icon: <FiLayers />,
      color: "#9370DB",
    },
  ];

  return (
    <div className="main-content">
      <Container>
        <Row>
          <Col style={{ marginTop: "50px" }}>
            <div className="cards-container">
              {cardData.map((item, index) => (
                <Card key={index} {...item} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
