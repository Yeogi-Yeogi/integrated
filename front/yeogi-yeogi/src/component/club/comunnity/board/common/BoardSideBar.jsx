import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const StyledSideBar = styled(Navbar)`
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
            width:100%;
            height: 100%;
            font-size: 1.1em;
            font-weight: 600;
            padding: 0.5em;

            &:active {
                background-color: #6c1895;
                color: white;
            }
     }
    }
`;


const BoardSideBar = () => {
    return (
        <StyledSideBar>
            <Container>
                <Nav.Link href="/club/board/list">자유</Nav.Link>
            </Container>
            <Container>
                <Nav.Link href='/club/board/notice/list'>공지사항</Nav.Link>
            </Container>
            <Container>
                <Nav.Link href='/club/board/write'>작성하기</Nav.Link>
            </Container>
        </StyledSideBar>
    );
};

export default BoardSideBar;