import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import BoardList from './BoardList';
import BoardSideBar from './common/BoardSideBar';
import BoardWrite from './BoardWrite';
import NoticeLayout from '../notice/NoticeLayout';
import BoardDetail from './BoardDetail';


const StyledBoardLayout = styled.div`
    width: 100%;
    margin: auto;

    & > div {
        width: 70em;
        display: flex;
        justify-content: space-between;
        margin: auto;
    }

`;
const BoardLayout = () => {
    return (
        <StyledBoardLayout>
            <div>
                <BoardSideBar />
                <Routes>
                    <Route path='/' element={<BoardList />}/>
                    <Route path='/list' element={<BoardList />}/>
                    <Route path='/notice/*' element={<NoticeLayout />} />
                    <Route path='/write' element={<BoardWrite />} />
                    <Route path='/detail/:boardNo' element={<BoardDetail />} />
                </Routes>
            </div>
        </StyledBoardLayout>
    );
};

export default BoardLayout;