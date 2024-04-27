import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import "./Category.css";
import axios from "axios";

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [userData, setUserData] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [newCourse, setNewCourse] = useState({
    categoryImage: "",
    categoryName: "",
    categoryDesc: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null); // Track the item being deleted

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/exam-categories/"
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id) => {
    const categoryToEdit = userData.find((user) => user._id === id);
    setEditMode(true);
    setEditCategory(categoryToEdit);
    setNewCourse({
      categoryName: categoryToEdit.categoryName,
      categoryDesc: categoryToEdit.categoryDesc,
      categoryImage: categoryToEdit.categoryImage,
    });
    setShowAddEditModal(true);
  };

  const handleDelete = async (_id) => {
    setDeletingItemId(_id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/exam-categories/${deletingItemId}`
      );
      window.location.reload(); // Reload the page after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingItemId(null);
      setShowDeleteModal(false);
    }
  };

  const toggleAddEditModal = () => {
    setShowAddEditModal(!showAddEditModal);
    setEditMode(false);
    setEditCategory(null);
    setNewCourse({
      categoryName: "",
      categoryDesc: "",
      categoryImage: "",
    });
  };

  const handleInputChange = (event) => {
    if (event.target.name === "categoryImage") {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse((prevState) => ({
          ...prevState,
          categoryImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      const { name, value } = event.target;
      setNewCourse((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3000/exam-categories/${editCategory._id}`,
          newCourse
        );
      } else {
        await axios.post("http://localhost:3000/exam-categories/", newCourse);
      }
      fetchData();
      setShowAddEditModal(false);
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredData = userData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

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
            <button className="add-button" onClick={toggleAddEditModal}>
              Add
            </button>
          </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Course</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.categoryImage}
                    alt="course-img"
                    width={50}
                    height={50}
                  />
                </td>
                <td>{item.categoryName}</td>
                <td>{item.categoryDesc}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(item._id)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
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
      <div className={`modal-custom ${showAddEditModal ? "active" : ""}`}>
        <div className="modal-custom-content">
          <span className="close" onClick={toggleAddEditModal}>
            &times;
          </span>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            {editMode ? "Edit Course" : "Add New Course"}
          </h2>
          <form className="custom-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="categoryImage">Course Image</label>
              <input
                type="file"
                id="categoryImage"
                name="categoryImage"
                accept="image/jpeg, image/png"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="categoryName">Course</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                placeholder="Enter course name"
                value={newCourse.categoryName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="categoryDescription">Description:</label>
              <textarea
                id="categoryDescription"
                name="categoryDesc"
                placeholder="Enter course description"
                value={newCourse.categoryDesc}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit">{editMode ? "Update" : "Add"}</button>
          </form>
        </div>
      </div>
      <div className={`modal-custom ${showDeleteModal ? "active" : ""}`}>
        <div className="modal-custom-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="modal-buttons">
            <button className="yes" onClick={confirmDelete}>
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

export default Category;
