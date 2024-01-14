import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoticeList from './NoticeList';
import NoticeDetail from './NoticeDetail';
import NoticeWrite from './NoticeWrite';

const NoticeLayout = () => {
    return (
        <Routes>
            <Route path='list' element={<NoticeList />}/>
            <Route path='detail' element={<NoticeDetail />}/>
            <Route path='write' element={<NoticeWrite />}/>
        </Routes>
    );
};

export default NoticeLayout;