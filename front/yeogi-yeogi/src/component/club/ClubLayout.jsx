import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import ManageLayout from './manage/ManageLayout';
import InnerLayout from './comunnity/board/common/InnerLayout';


const StyledClubLayoutDiv = styled.div`

    width: 100%;
`;
const ClubLayout = () => {
    return (
        <StyledClubLayoutDiv>
            <Routes>
                <Route path='/commu/*' element={<InnerLayout />}/>
                <Route path='/manage/*' element={<ManageLayout />}/>
            </Routes>
        </StyledClubLayoutDiv>
    );
};

export default ClubLayout;