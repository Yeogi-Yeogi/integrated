import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberLayouDiv = styled.div`
    width: 100%;
`;

const MemberLayout = () => {
    return (
        <StyledMemberLayouDiv>
            <Routes>
                <Route path='/join' element={<Memberjoin/>}/>
                <Route path='/login'element={<Memberlogin/>}/>
            </Routes>          
        </StyledMemberLayouDiv>
    );
};

export default MemberLayout;