import React from 'react';
import { Route, Routes } from 'react-router-dom';
import JoinClub from './JoinClub';
import EditMain from './EditClub/EditMain';
import EditClub from './EditClub/EditClub';



const ManageLayout = () => {
    return (
            <Routes>
                {/* 임시,,, 테스트용,,,,, 에딧클럽... */}
                <Route path='editClub' element={<EditClub/>}></Route> 
                <Route path='edit' element={<EditMain/>}></Route>
                <Route path='join' element={<JoinClub/>}></Route>
            </Routes>
    );
};

export default ManageLayout;