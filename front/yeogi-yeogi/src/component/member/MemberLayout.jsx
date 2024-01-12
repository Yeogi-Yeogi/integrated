import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MemberJoin from './MemberJoin';
import MemberLogin from './MemberLogin';

const StyledMemberLayouDiv = styled.div`
    width: 100%;
`;

const MemberLayout = () => {
    return (
        <StyledMemberLayouDiv>
            <Routes>
                <Route path='/join' element={<MemberJoin/>}/>
                <Route path='/login'element={<MemberLogin/>}/>
            </Routes>          
        </StyledMemberLayouDiv>
    );
};

export default MemberLayout;