import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "./Users.css"; // Import your CSS file for styling

const Users = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users per page
  const [userData, setUserData] = useState([]); // State to store fetched user data
  const [deletingItemId, setDeletingItemId] = useState(null); // State for storing ID of item being deleted
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for controlling delete confirmation modal

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/"); // Assuming your endpoint is '/users'
        setUserData(response.data); // Set the fetched user data to state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the fetchData function when component mounts
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setCurrentPage(1); // Reset to first page when searching
    setSearchTerm(event.target.value);
  };

  // Handle delete button click
  const handleDelete = async (_id, name) => {
    setDeletingItemId(_id);
    setShowDeleteModal(true);
  };

  // Confirm user deletion
  const confirmDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${_id}`);
      window.location.reload(); // Reload the page after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingItemId(null);
      setShowDeleteModal(false);
    }
  };

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredData = userData.filter((item) =>
    Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof value === "number") {
        // Convert the number to string before searching
        return value.toString().includes(searchTerm);
      } else {
        return false; // Ignore other data types for now
      }
    })
  );

  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  // Handle modal for displaying user profile images
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleModalOpen = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalContent(null);
  };

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
              <th>Profile</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={index}>
                <td>
                  <div
                    className="profile-container"
                    onMouseEnter={() => handleModalOpen(item.userimg)}
                    onMouseLeave={handleModalClose}
                  >
                    <img className="tbl-img" src={item.userimg} alt="profile" />
                  </div>
                  {/* Modal */}
                  {modalOpen && (
                    <div className="modal">
                      <img src={modalContent} alt="profile" />
                    </div>
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.mobile}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item._id, item.name)}
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
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {/* Delete confirmation modal */}
      <div className={`modal-custom ${showDeleteModal ? "active" : ""}`}>
        <div className="modal-custom-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this user?</p>
          <div className="modal-buttons">
            <button
              className="yes"
              onClick={() => confirmDelete(deletingItemId)}
            >
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

export default Users;