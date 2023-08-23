import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from "../components/Hero";
import nodpImage from '/images/nodp.png';

const UserDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  if (!userInfo) {
    // Handle the case when userInfo is not available (user is not logged in)
    return <div><Hero/></div>;
  }

  return (
    <Container fluid>
      <Row className='justify-content-center align-items-center vh-100'>
        <Col xs={12} md={6} className='text-center'>
          <img
            src={ userInfo.image? "/images/" + userInfo.image : nodpImage} //  path to the profile image
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
  );
};

export default UserDetails;
