import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getValue } from '@testing-library/user-event/dist/utils';

const StyledNavbar = styled(Navbar)`
  margin: auto;
  background-color: white;
  
  width: 60%;

  & > div { //container
    background-color: white;
    border-bottom: 0.05em solid #999999;

    & a {
      color: black;
      text-decoration: none;
      text-align: center;
      width: 5em;
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

const InnerNavBar = () => {

  const isSpecialCondition = true;
  const boardDynamicToValue = isSpecialCondition
    ? ['/club/board/list', '/club/board/notice/list', '/club/board/detail']
    : '/club/board/write';

  return (
    <StyledNavbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto m-auto">
            <NavLink to={boardDynamicToValue}>
              게시글
            </NavLink>
            <NavLink to="/club/schedule/list">
              일정
            </NavLink>
            <NavLink to="/club/gallery/list">
              갤러리
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default InnerNavBar;