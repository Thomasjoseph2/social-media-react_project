import React,{ useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import {Form ,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from "../../components/FormContainer";
import { useAdminLoginMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";
import {toast} from 'react-toastify'
const LoginScreen = () => {
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');

   const navigate=useNavigate();
   const dispatch=useDispatch();
  
   const {adminInfo}=useSelector((state)=>state.adminAuth);
   const [login,{isLoading}]=useAdminLoginMutation();

   useEffect(()=>{

    if(adminInfo){
      navigate('/admin/Home');
    }
   },[navigate,adminInfo])


   const submitHandler=async (e)=>{
    e.preventDefault();
  try {
      const res=await login({email,password}).unwrap();
      dispatch(setCredentials({...res}))
      navigate('/admin/Home')
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
     </Form>
    </FormContainer>
  )
}

export default LoginScreen
