import { Container, Row, Col } from 'react-bootstrap';
import React from 'react'

const UserDetails = () => {
  return (
    <Container fluid>

    <Row className='justify-content-center align-items-center vh-100'>
      <Col xs={12} md={6} className='text-center'>
        <img
          src={userInfo.profileImage || '/images/nodp.jpg'} // Use the actual path to the profile image
          alt={userInfo.name}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <h2 className='mt-3'>Welcome, {userInfo.name}!</h2>
      </Col>
    </Row>
  </Container>
  )
}

export default UserDetails


