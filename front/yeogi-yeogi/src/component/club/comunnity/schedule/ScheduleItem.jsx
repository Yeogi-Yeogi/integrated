
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const StyledScheduleItemDiv = styled.div`
    width: 70%;
    margin: auto;
    margin-bottom: 2em;
    padding: 2em;
    background-color: #fafafa;

    &:hover {
        cursor: pointer;
        background-color: #cacaca;
    }

    & > div:first-child  {
        margin-bottom: 0.4em;
        & > span {
            font-size: 1.4em;
            font-weight: 700;
        }
    }

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
const ScheduleItem = ({data}) => {

    const navigate = useNavigate();
    const {clubNo} = useParams();
    const handleClick = (no) => {
        navigate(`/club/${clubNo}/commu/board/notice/detail/${no}`);
    }
    return (
        <StyledScheduleItemDiv onClick={() => {handleClick(data.boardNo)}}>
            <div>
                <span>{data.title}</span>
            </div>
            <div>
                <FontAwesomeIcon icon={icon({name: 'calendar-check', family: 'classic', style: 'regular'})} />
                <span>{data.startTime}</span>
                <br />
                <FontAwesomeIcon icon={icon({name: 'location-dot', family: 'classic', style: 'solid'})} />
                <span>{data.location}</span>
            </div>
        </StyledScheduleItemDiv>
    );
};

export default ScheduleItem;