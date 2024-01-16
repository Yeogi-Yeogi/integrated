import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MemberJoin from './MemberJoin';
import MemberLogin from './MemberLogin';
import MemberEdit from './MemberEdit';
import MemberLogout from './MemberLogout';
import MemberQuit from './MemberQuit';


const StyledMemberLayoutDiv = styled.div`
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
        <StyledMemberLayoutDiv>
            <div>
                <Routes>
                    <Route path='/join' element={<MemberJoin/>}/>
                    <Route path='/login'element={<MemberLogin/>}/>
                    {/* <Route path='/mySelect' element={<MemberMySelect/>}/> */}
                    <Route path='/edit' element={<MemberEdit/>}/>
                    <Route path='/logout' element={<MemberLogout/>}/>
                    <Route path='/quit' element={<MemberQuit/>}/>
                </Routes>  
            </div>                   
        </StyledMemberLayoutDiv>
    );
};

export default MemberLayout;