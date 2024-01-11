
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';
import styled from 'styled-components';

const StyledScheduleItemDiv = styled.div`
    width: 70%;
    margin: auto;
    margin-bottom: 2em;
    padding: 2em;
    

    background-color: #fafafa;

    & * {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    & > div {

        & > * {
            margin-left: 30px;
        }
    }

    & svg {
        font-size: 2em;
        color: #999999;
    }
`;
const ScheduleItem = () => {
    return (
        <StyledScheduleItemDiv>
            <div>
                <span>일정 이름</span>
            </div>
            <div>
                <FontAwesomeIcon icon={icon({name: 'calendar-check', family: 'classic', style: 'regular'})} />
                <span>2024년 1월 19일</span>
                <FontAwesomeIcon icon={icon({name: 'location-dot', family: 'classic', style: 'solid'})} />
                <span>서울특별시 강남구 테헤란로</span>
            </div>
        </StyledScheduleItemDiv>
    );
};

export default ScheduleItem;