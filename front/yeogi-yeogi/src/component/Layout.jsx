import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { Route, Routes, useParams } from 'react-router-dom';
import ClubLayout from './club/ClubLayout';
import MemberLayout from './member/MemberLayout';
import CreateClub from './club/manage/CreateClub';

const StyledLayOutDiv = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    /* grid-template-rows: auto; */
    grid-template-rows: 100px auto 200px;

`;

const Layout = () => {

    return (
        <StyledLayOutDiv>
            <Header />
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/member/*' element={<MemberLayout/>}/>
                <Route path='/club/:clubNo/*' element={<ClubLayout/>}/>
                <Route path='/club/createClub' element={<CreateClub/>}/>
            </Routes>
            <Footer />
        </StyledLayOutDiv>
    );
};

export default Layout;