import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ManageLayout from './manage/ManageLayout';
import InnerLayout from './comunnity/board/common/InnerLayout';
import JoinClub from './manage/JoinClub';


const StyledClubLayoutDiv = styled.div`
    height: 100%;
    width: 100%;
`;

const ClubLayout = () => {
    return (
        <StyledClubLayoutDiv>
            <Routes>
                <Route path='/commu/*' element={<InnerLayout />}/>
                <Route path='/manage/*' element={<ManageLayout />}/>
                <Route path='join' element={<JoinClub/>}></Route>
            </Routes>
        </StyledClubLayoutDiv>
    );
};

export default ClubLayout;