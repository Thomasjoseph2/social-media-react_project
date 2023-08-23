import { Navbar, Nav, Container ,NavDropdown,Badge} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import { useAdminLogoutMutation } from '../slices/adminApiSlice';
import { logout } from '../slices/adminAuthSlice';
import { useNavigate } from 'react-router-dom';
const AdminHeader = () => {
  const {adminInfo}=useSelector((state)=>state.adminAuth)

  const dispatch =useDispatch();
  const navigate=useNavigate();

  const [logoutApiCall]=useAdminLogoutMutation();

  const logoutHandler=async ()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout())
      navigate('/');

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >MERN APP ADMIN </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
               {adminInfo?(
               <>
                 <NavDropdown title={adminInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                     Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                    </NavDropdown.Item>
                 </NavDropdown>
               </>
               ):(<> <LinkContainer to='admin/login'>
              <Nav.Link >
                <FaSignInAlt /> Sign In     
              </Nav.Link>
              </LinkContainer>
              </>)}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;