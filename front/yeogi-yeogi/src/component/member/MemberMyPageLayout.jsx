import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import MemberMySelect from './MemberMySelect';
import MemberEdit from './MemberEdit';
import MemberQuit from './MemberQuit';
import MyPageNavBar from '../club/comunnity/board/common/MyPageNavBar';

const StyledMemberMyPageLayout = styled.div`
    /* height: 100%;
    width: 100%; */
    margin-bottom: 3em;
    margin: auto;
    padding: 1em;
    width: 80%;
`;

const MemberMyPageLayout = () => {
    return (
        <StyledMemberMyPageLayout>
            <MyPageNavBar/>
            <Routes>
                <Route path='/mySelect' element={<MemberMySelect/>}/>
                <Route path='/edit' element={<MemberEdit/>}/>
                <Route path='/quit' element={<MemberQuit/>}/>
            </Routes>           
        </StyledMemberMyPageLayout>
    );
};

export default MemberMyPageLayout;