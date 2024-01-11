import React from 'react';
import InnerNavBar from './InnerNavBar';
import { Route, Routes } from 'react-router-dom';
import BoardLayout from '../BoardLayout';
import ScheduleLayout from '../../schedule/ScheduleLayout';

const InnerLayout = () => {
    return (
        <div>
            <InnerNavBar />
            <Routes>
                <Route path='/board/*' element={<BoardLayout/>}/>
                <Route path='/schedule/*' element={<ScheduleLayout/>}/>
            </Routes>
        </div>
    );
};

export default InnerLayout;