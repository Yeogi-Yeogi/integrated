import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { Route, Routes, useParams } from 'react-router-dom';
import ClubLayout from './club/ClubLayout';
import MemberLayout from './member/MemberLayout';
import CreateClub from './club/manage/CreateClub';
import MainLayout from './main/MainLayout';

const StyledLayOutDiv = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    /* grid-template-rows: auto; */
    grid-template-rows: 100px 8fr auto;

`;

const Layout = () => {

    return (
        <StyledLayOutDiv>
            <Header />
            <Routes>
                <Route path='/main' element={<MainLayout/>}/>
                <Route path='/member/*' element={<MemberLayout/>}/>
                <Route path='/club/:clubNo/*' element={<ClubLayout/>}/>
                <Route path='/club/createClub' element={<CreateClub/>}/>
            </Routes>
            <Footer />
        </StyledLayOutDiv>
    );
};

export default Layout;