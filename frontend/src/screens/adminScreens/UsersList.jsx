import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import axios from 'axios';
import nodpImage from '/images/nodp.png';
import { useDeleteUserMutation } from "../../slices/adminApiSlice";
import {toast} from 'react-toastify'
const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [actualData, setActualData] = useState([]);
  const [results, setResults] = useState([]);
   
  const [deleteUser,{isLoading}]=useDeleteUserMutation();
 

  useEffect(() => {
    // Fetch user data from the backend
    axios.get("/api/admin/users")
      .then(response => {
        setActualData(response.data); // Set user data in state
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    if (actualData.length > 0) {
      // Filter the actual data based on the search term and update the results state
      const filtered = actualData.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    }
  }, [searchTerm, actualData]);
  const handleDeleteUser = async (userId,imagePath) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await deleteUser({ userId });
        // Remove the deleted user from the results array
        setResults(results.filter(user => user._id !== userId));
        // Show a success toast
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        // Show an error toast
        toast.error("An error occurred while deleting the user.");
      }
    }
  };
  

  const handleEditUser = (userId) => {
    // Implement the edit user functionality here
    // You can navigate to the edit user page or show a modal
    console.log("Edit user with ID:", userId);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name or email"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Delete</th>
            <th>Update</th> 
          </tr>
        </thead>
        <tbody>
          {results.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img
                  src={'/images/'+user.imagePath || nodpImage} // Replace with the actual image URL
                  alt={user.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user._id, '/images/'+user.imagePath )}>Delete</Button>
                </td>
                <td>
                <Button variant="primary" onClick={() => handleEditUser(user._id)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
