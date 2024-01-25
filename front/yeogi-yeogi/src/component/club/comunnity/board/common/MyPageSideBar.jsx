import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledSideBar = styled(Navbar)`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 10em;
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

const MyPageSideBar = () => {
    return (
        <StyledSideBar>
            <Container>
                <NavLink to="/member/myPageLayout/mySelect">내 정보 조회</NavLink>
            </Container>
            <Container>
                <NavLink to='/member/myPageLayout/edit'>내 정보 수정</NavLink>
            </Container>
            <Container>
                <NavLink to='/member/myPageLayout/quit'>회원탈퇴</NavLink>
            </Container>
        </StyledSideBar>
    );
};

export default MyPageSideBar;