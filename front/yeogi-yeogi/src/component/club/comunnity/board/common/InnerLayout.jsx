import React from 'react';
import InnerNavBar from './InnerNavBar';
import { Route, Routes } from 'react-router-dom';
import BoardLayout from '../BoardLayout';
import ScheduleLayout from '../../schedule/ScheduleLayout';
import styled from 'styled-components';
import GalleryLayout from '../gallery/GalleryLayout';
import ClubDescription from '../../../manage/ClubDescription';

const StyledInnerLayout = styled.div`

    margin-bottom: 3em;
    margin: auto;
    padding: 1em;
    width: 80%;
`;
const InnerLayout = () => {
    return (
        <StyledInnerLayout>
            <ClubDescription/>
            <InnerNavBar />
            <Routes>
                <Route path='/board/*' element={<BoardLayout/>}/>
                <Route path='/schedule/*' element={<ScheduleLayout/>}/>
                <Route path='/gallery/*' element={<GalleryLayout/>}/>
            </Routes>
        </StyledInnerLayout>
    );
};

export default InnerLayout;