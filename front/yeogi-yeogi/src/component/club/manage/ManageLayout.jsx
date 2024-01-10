import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateClub from './CreateClub';
import EditClub from './EditClub';
import JoinClub from './JoinClub';


const ManageLayout = () => {
    return (
            <Routes>
                <Route path='createClub' element={<CreateClub/>}></Route>
                <Route path='editClub' element={<EditClub/>}></Route>
                <Route path='joinClub' element={<JoinClub/>}></Route>
            </Routes>
    );
};

export default ManageLayout;