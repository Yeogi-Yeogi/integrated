import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardSideBar from './common/BoardSideBar';
import NoticeLayout from './notice/NoticeLayout';
import NoticeWrite from './NoticeWrite';

const StyledBoardLayout = styled.div`
    width: 65em;
    display: flex;
    justify-content: center;

    & > nav {
        margin-right: 5em;
       
    }

    & > div {
        margin: auto;
        padding: 1em;
    }
`;
const BoardLayout = () => {
    return (
        <StyledBoardLayout>
           <BoardSideBar />
            <Routes>
                <Route path='/list' element={<BoardList />}/>
                <Route path='/notice/*' element={<NoticeLayout />} />
                <Route path='/write' element={<NoticeWrite />} />
            </Routes>
        </StyledBoardLayout>
    );
};

export default BoardLayout;