import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MemberJoin from './MemberJoin';
import MemberLogin from './MemberLogin';

const StyledMemberLayouDiv = styled.div`
    width: 100%;
    margin: auto;

    & > div {
        /* width: 70em; */
        display: flex;
        justify-content: space-between;
        margin: auto;
    }
`;

const MemberLayout = () => {
    return (
        <StyledMemberLayouDiv>
            <div>
                <Routes>
                    <Route path='/join' element={<MemberJoin/>}/>
                    <Route path='/login'element={<MemberLogin/>}/>
                </Routes>  
            </div>                   
        </StyledMemberLayouDiv>
    );
};

export default MemberLayout;