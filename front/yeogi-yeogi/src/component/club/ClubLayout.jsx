import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import BoardLayout from './comunnity/board/BoardLayout';


const StyledClubLayoutDiv = styled.div`

    width: 100%;
`;
const ClubLayout = () => {
    return (
        <StyledClubLayoutDiv>
            <Routes>
                <Route path='/board/*' element={<BoardLayout />}/>
            </Routes>
        </StyledClubLayoutDiv>
    );
};

export default ClubLayout;