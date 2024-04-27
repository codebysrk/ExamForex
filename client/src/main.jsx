import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
// import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
// import UserModule from "./components/user-module/UserModule";
import AdminLogin from "./components/admin-module/AdminLogin";
import Header from "./components/admin-module/Header";
import Sidebar from "./components/admin-module/Sidebar";
import Dashboard from "./components/admin-module/Dashboard";
import Users from "./components/admin-module/Users";
import Category from "./components/admin-module/Category";
import Exams from "./components/admin-module/Exams";
import Feedback from "./components/admin-module/Feedback";
import CreateExam from "./components/admin-module/CreateExam";
import Test from "./components/admin-module/Test";

const appRouter = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <UserModule />,
  // },
  {
    path: "/",
    element: <AdminLogin />,
  },
  {
    path: "/admin/home",
    element: (
      <>
        <Container>
          <Row>
            <Col>
              <Header />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9}>
              <Dashboard />
            </Col>
          </Row>
        </Container>
      </>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <>
        <Container>
          <Row>
            <Col>
              <Header />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9}>
              <Users />
            </Col>
          </Row>
        </Container>
      </>
    ),
  },
  {
    path: "/admin/category",
    element: (
      <>
        <Container>
          <Row>
            <Col>
              <Header />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9}>
              <Category />
            </Col>
          </Row>
        </Container>
      </>
    ),
  },
  {
    path: "/admin/exams",
    element: (
      <>
        <Container>
          <Row>
            <Col>
              <Header />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9}>
              <Exams />
            </Col>
          </Row>
        </Container>
      </>
    ),
  },
  {
    path: "/admin/feedback",
    element: (
      <>
        <Container>
          <Row>
            <Col>
              <Header />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9}>
              <Feedback />
            </Col>
          </Row>
        </Container>
      </>
    ),
  },
  {
    path: "/admin/create-exam",
    element: (
      <>
        <Container>
          <Row>
            <Col>
              <Header />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9}>
              <CreateExam/>
            </Col>
          </Row>
        </Container>
      </>
    ),
  },
  {
    path: "/admin/test",
    element: (
      <>
        <Container>
          <Row>
            <Col>
              <Header />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
            <Col md={9}>
              <Test/>
            </Col>
          </Row>
        </Container>
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={appRouter} />
  </>
);
