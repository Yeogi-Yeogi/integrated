import React from 'react';
import styled from 'styled-components';
import ScheduleItem from './ScheduleItem';

const StyledSchedulePastDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;
`;
const SchedulePast = () => {


    //데이터 받아오기
    
    return (
        <StyledSchedulePastDiv>
            <ScheduleItem/>
            <ScheduleItem/>
            <ScheduleItem/>
            <ScheduleItem/>
        </StyledSchedulePastDiv>
    );
};

export default SchedulePast;