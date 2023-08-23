import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const AdminHero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN Admin Authentication</h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className='d-flex'>
            <Link to='/admin/login'>
            <Button variant='primary' className='me-3'>
              Sign In
            </Button>
            </Link>
            
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default AdminHero;