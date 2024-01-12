import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import ClubLayout from './club/ClubLayout';
import MemberLayout from './member/MemberLayout';

const StyledLayOutDiv = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: auto;

`;

const Layout = () => {
    return (
        <StyledLayOutDiv>
            <Header />
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/member/*' element={<MemberLayout/>}/>
                <Route path='/club/*' element={<ClubLayout/>}/>
            </Routes>
            <Footer />
        </StyledLayOutDiv>
    );
};

export default Layout;