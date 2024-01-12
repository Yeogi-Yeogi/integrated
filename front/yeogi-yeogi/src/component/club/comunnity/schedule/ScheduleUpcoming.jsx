import React from 'react';
import styled from 'styled-components';
import ScheduleItem from './ScheduleItem';

const StyledScheduleLisDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;
`;
const ScheduleUpcoming = () => {

     //데이터 받아오기

    return (
        <StyledScheduleLisDiv>
            <ScheduleItem/>
            <ScheduleItem/>
            <ScheduleItem/>
        </StyledScheduleLisDiv>
    );};

export default ScheduleUpcoming;