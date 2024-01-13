import React from 'react';
import { Route, Routes } from 'react-router-dom';
import JoinClub from './JoinClub';
import EditClubLayout from './EditClub/EditClubLayout';


const ManageLayout = () => {
    return (
            <Routes>
                <Route path='editClub' element={<EditClubLayout/>}></Route>
                <Route path='joinClub' element={<JoinClub/>}></Route>
            </Routes>
    );
};

export default ManageLayout;