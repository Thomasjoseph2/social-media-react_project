import React from 'react';
import Header from './components/header';
import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from './components/adminHeader';
const App = () => {
  const location=useLocation();

  const adminHeader= location.pathname.startsWith("/admin")
  return (
    <>
     {adminHeader ? <AdminHeader/>:  <Header/>}
    <ToastContainer/>
    <Container className='my-2'>
    <Outlet/>
    </Container>
  
    </>
  )
}

export default App
