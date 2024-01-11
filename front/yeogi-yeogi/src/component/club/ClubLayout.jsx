import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import BoardLayout from './comunnity/board/BoardLayout';
import ManageLayout from './manage/ManageLayout';
import ScheduleList from './comunnity/schedule/ScheduleList';


const StyledClubLayoutDiv = styled.div`

    width: 100%;
`;
const ClubLayout = () => {
    return (
        <StyledClubLayoutDiv>
            <Routes>
                <Route path='/board/*' element={<BoardLayout />}/>
                <Route path='/manage/*' element={<ManageLayout />}/>
                <Route path='/schedule/*' element={ScheduleList />}/>
            </Routes>
        </StyledClubLayoutDiv>
    );
};

export default ClubLayout;