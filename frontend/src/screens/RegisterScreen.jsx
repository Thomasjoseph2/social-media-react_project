import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { useRegisterMutation } from "../slices/usersApislice";
import { setCredentials } from "../slices/authSlice";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,SetConfirmPassword]=useState("")
  
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {userInfo}=useSelector((state)=>state.auth);
  const [register,{isLoading}]=useRegisterMutation();


  useEffect(()=>{

    if(userInfo){
      navigate('/');
    }
   },[navigate,userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
      if(password !==confirmPassword){
        toast.error('passwords do not match')
      }else{
        try {
          const res=await register({name,email,password}).unwrap();
          dispatch(setCredentials({...res}))
          navigate('/')
        } catch (error) {
          toast.error(error.data.message || error.error);
        }
      }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            required
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            minLength={6}
            onChange={(e) => SetConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account?<Link to="/login">Sign In</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
