import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledScheduleSideBar = styled(Navbar)`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20em;
    height: 100%;

    & > div {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        background-color: #ffffff;

        &  > a {
            text-align: right;
            color: black;
            text-decoration: none;
            width:100%;
            height: 100%;
            font-size: 1.1em;
            font-weight: 600;
            padding: 0.5em;


            &.active {
                background-color: #6c1895;
                color: white;
            }
        }
    }
`;

const ScheduleSideBar = () => {
    return (
        <StyledScheduleSideBar>
            <Container>
                <NavLink to="upcoming">예정</NavLink>
            </Container>
            <Container>
                <NavLink to='past'>지난일정</NavLink>
            </Container>
        </StyledScheduleSideBar>
    );
};

export default ScheduleSideBar;
