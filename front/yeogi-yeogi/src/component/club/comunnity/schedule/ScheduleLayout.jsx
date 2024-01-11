import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import ScheduleUpcoming from './ScheduleUpcoming';
import SchedulePast from './SchedulePast';
import ScheduleSideBar from './ScheduleSideBar';

const StyledScheduleLayout = styled.div`
    width: 100%;
    margin: auto;

    & > div {
        width: 70em;
        display: flex;
        justify-content: space-between;
        margin: auto;
    }

`;
const ScheduleLayout = () => {
    return (
        <StyledScheduleLayout>
            <div>
                <ScheduleSideBar /> 
                <Routes>
                    <Route path='/' element={<ScheduleUpcoming/>}/>
                    <Route path='upcoming' element={<ScheduleUpcoming />}/>
                    <Route path='past' element={<SchedulePast />}/>
                </Routes>
            </div>
        </StyledScheduleLayout>
    );
};

export default ScheduleLayout;