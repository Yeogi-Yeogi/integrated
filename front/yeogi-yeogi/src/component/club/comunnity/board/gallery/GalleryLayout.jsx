import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GalleryList from './GalleryList';

const GalleryLayout = () => {
    return (
        <Routes>
            <Route path='/list' element={<GalleryList />}/> 
        </Routes>
    );
};

export default GalleryLayout;