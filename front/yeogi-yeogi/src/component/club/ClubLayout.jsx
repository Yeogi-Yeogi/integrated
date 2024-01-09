import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import BoardLayout from './comunnity/board/BoardLayout';
import InnerNavBar from './comunnity/board/common/InnerNavBar';

const StyledClubLayoutDiv = styled.div`
    display: inline-block;
    width: 60%;
    height: 100%;
    margin: auto;

    & > div {
        margin: auto;
    }
`;
const ClubLayout = () => {
    return (
        <StyledClubLayoutDiv>
           <InnerNavBar /> 
            <Routes>
                <Route path='/board/*' element={<BoardLayout />}/>
            </Routes>
        </StyledClubLayoutDiv>
    );
};

export default ClubLayout;