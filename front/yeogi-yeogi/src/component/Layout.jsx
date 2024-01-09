import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import ClubLayout from './club/ClubLayout';

const StyledLayOutDiv = styled.div`
    width: 100vw;
    height: 100vh;
    /* background-color: #00d9ff; */
    display: grid;
    grid-template-rows: 100px 5fr 1.5fr;

`;

const Layout = () => {
    return (
        <StyledLayOutDiv>
            <Header />
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/club/*' element={<ClubLayout/>}/>
            </Routes>
            <Footer />
        </StyledLayOutDiv>
    );
};

export default Layout;