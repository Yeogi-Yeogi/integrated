import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoticeList from './NoticeList';

const NoticeLayout = () => {
    return (
        <Routes>
            <Route path='/list' element={<NoticeList />}/>
        </Routes>
    );
};

export default NoticeLayout;