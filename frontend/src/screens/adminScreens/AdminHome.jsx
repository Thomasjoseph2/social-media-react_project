import React from 'react';
import AdminHero from '../../components/AdminHero';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const AdminHome = () => {
    
    const { adminInfo } = useSelector((state) => state.adminAuth);
  
    if (!adminInfo) {
      // Handle the case when userInfo is not available (user is not logged in)
      return <div><AdminHero/></div>;
    }

  return (
 
     <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN Admin  Authentication</h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className='d-flex'>
            {adminInfo ? <Link to='/admin/users'>
            <Button variant='primary' className='me-3'>
              users
            </Button>
            </Link>:<Link to='/login'>
            <Button variant='primary' className='me-3'>
            login
            </Button>
            </Link>}
            
          </div>
        </Card>
      </Container>
    </div>

  );
};

export default  AdminHome;
