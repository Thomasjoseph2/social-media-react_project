import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import nodpImage from "/images/nodp.png";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../slices/usersApislice";

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [actualData, setActualData] = useState([]);
  const [results, setResults] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [register] = useRegisterMutation();
  const [updateProfile] = useUpdateUserMutation();

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("/api/admin/users")
      .then((response) => {
        setActualData(response.data); // Set user data in state
        console.log(response.data);
      })
      .catch((error) => {
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

  const handleEditUser = (userId) => {
    const userToEdit = results.find((user) => user._id === userId);
    setSelectedUser(userToEdit);
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

      if (!selectedUser || !selectedUser.name || !selectedUser.email) {
    toast.error("Please fill in all fields.");
    return;
  }
    try {
      const formData = new FormData();
      formData.append("_id", selectedUser._id);
      formData.append("name", selectedUser.name);
      formData.append("email", selectedUser.email);
      const res = await updateProfile(formData).unwrap();
      // Close the edit modal
      setShowEditModal(false);
      // Update the results state variable
      setResults((prevResults) => {
        return prevResults.map((user) => {
          if (user._id === selectedUser._id) {
            return {
              ...user,
              name: selectedUser.name,
              email: selectedUser.email,
            };
          } else {
            return user;
          }
        });
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeleteUser = async (userId, imagePath) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await deleteUser({ userId });
        // Remove the deleted user from the results array
        setResults((prevResults) =>
          prevResults.filter((user) => user._id !== userId)
        );
        // Show a success toast
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        // Show an error toast
        toast.error("An error occurred while deleting the user.");
      }
    }
  };

  const handleAddUser = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await register({ name, email, password });
      // Show a success toast for 2 seconds
      toast.success("User added successfully!", { duration: 2000 });
      // This will trigger a re-render of the component
      setActualData([
        ...actualData,
        { _id: res.id, name, email, imagePath: "/images/nodp.png" }, // Replace with actual image path
      ]);
      setResults([
        ...results,
        { _id: res.id, name, email, imagePath: "/images/nodp.png" }, // Replace with actual image path
      ]);
      setName("");
      setEmail("");
      setPassword("");
      setShowAddModal(false);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add User
      </Button>

      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onExited={() => toast.dismiss()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mt-3">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 required
                 minLength={6}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onExited={() => toast.dismiss()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mt-3">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedUser ? selectedUser.name : ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedUser ? selectedUser.email : ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Form.Group className="mb-3 mt-3">
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
          {results.map((user, index) => (
            <tr key={"I" + index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img
                  src={user.imagePath ? "/images/" + user.imagePath : nodpImage}
                  alt={user.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user._id, user.imagePath)}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditUser(user._id)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
