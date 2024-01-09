import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Nav, Navbar } from 'react-bootstrap';


const StyledNavbar = styled(Navbar)`
  
  background-color: white;
  border-bottom: 0.05em solid #999999;
  width: 95%;
  margin: auto;

  & > div {
    background-color: white;

    & a {
      height: 100%;
      font-size: 1.2em;
      font-weight: 600;
      margin-left: 4em;
      margin-right: 4em;
    }
  }
  
  
`;


const InnerNavBar = () => {

    return (
    <StyledNavbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto m-auto">
            <Nav.Link href="/club/board/list">게시글</Nav.Link>
            <Nav.Link href="#link">일정</Nav.Link>
            <Nav.Link href="#link">갤러리</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
    );
};

export default InnerNavBar;