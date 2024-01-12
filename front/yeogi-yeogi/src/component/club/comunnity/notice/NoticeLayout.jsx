import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoticeList from './NoticeList';
import NoticeDetail from './NoticeDetail';

const NoticeLayout = () => {
    return (
        <Routes>
            <Route path='list' element={<NoticeList />}/>
            <Route path='detail' element={<NoticeDetail />}/>
        </Routes>
    );
};

export default NoticeLayout;