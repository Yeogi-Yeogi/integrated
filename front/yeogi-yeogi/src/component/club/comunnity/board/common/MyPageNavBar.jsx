import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const StyledMyPageNavBar = styled(Navbar)`
  margin-top: 2em;
  margin: auto;
  background-color: white;
  
  width: 80%;

  & > div { //container
    background-color: white;
    border-bottom: 0.05em solid #999999;

    & a {
      color: black;
      text-decoration: none;
      text-align: center;
      width: 10em;
      height: 100%;
      font-size: 1.2em;
      font-weight: 600;
      padding: 0.5em;
      margin-left: 4em;
      margin-right: 4em;

      &.active {
        background-color: #6c1895;
        color: white;
      }
    }
  }
`;

const MyPageNavBar = () => {
    return (
        <StyledMyPageNavBar expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto m-auto">
                    <NavLink to={`/mySelect`}>
                    마이 페이지
                    </NavLink>
                    {/* <NavLink to={`/club/${clubNo}/commu/schedule`}>
                    일정
                    </NavLink>
                    <NavLink to={`/club/${clubNo}/commu/gallery/list `}>
                    갤러리
                    </NavLink> */}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </StyledMyPageNavBar>
    );
};

export default MyPageNavBar;