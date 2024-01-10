import React from 'react';
import styled from "styled-components";
import BoardListItem from './BoardListItem';

const StyledBoardListDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;
`;
const BoardList = () => {
    return (
        <StyledBoardListDiv>
            <BoardListItem/>
            <BoardListItem/>
            <BoardListItem/>
            <BoardListItem/>
        </StyledBoardListDiv>
    );
};

export default BoardList;