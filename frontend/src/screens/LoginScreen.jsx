import React,{ useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import {Form ,Button,Row,Col} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer";
import {useLoginMutation} from '../slices/usersApislice';
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'
const LoginScreen = () => {
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');

   const navigate=useNavigate();
   const dispatch=useDispatch();
  
   const {userInfo}=useSelector((state)=>state.auth);
   const [login,{isLoading}]=useLoginMutation();

   useEffect(()=>{

    if(userInfo){
      navigate('/');
    }
   },[navigate,userInfo])


   const submitHandler=async (e)=>{
    e.preventDefault();
  try {
      const res=await login({email,password}).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/')
  } catch (error) {
    toast.error(error.data.message || error.error);
  }
   }
  return (
    <FormContainer>
     <h1>Sign in</h1>

     <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control 
        type='email'
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="my-2" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type='password'
        placeholder="Enter passwordl"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type="submit" variant='primary' className="mt-3"> Sign In </Button>
      <Row className="py-3">
        <Col>
        New Coustomer?<Link to='/register'>Sign Up</Link>
        </Col>
      </Row>
     </Form>
    </FormContainer>
  )
}

export default LoginScreen
