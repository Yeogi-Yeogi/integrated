import React from 'react';
import { Route, Routes } from 'react-router-dom';
import JoinClub from './JoinClub';
import EditMain from './EditClub/EditMain';
import EditClub from './EditClub/EditClub';
import styled from 'styled-components';
import EditMember from './EditClub/EditMember';
import ClubDescription from './ClubDescription';
import EditClubInfo from './EditClub/EditClubInfo';

const StyledManageLayoutDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;
    margin-bottom: 70px;
`;

const ManageLayout = () => {

    return (
        <StyledManageLayoutDiv>
            <Routes>
                <Route path='/editClub' element={<EditClubInfo/>}></Route>
                <Route path='/editClub2' element={<ClubDescription/>}></Route>
            </Routes>
            <EditMember/>
        </StyledManageLayoutDiv>
    );
};

export default ManageLayout;