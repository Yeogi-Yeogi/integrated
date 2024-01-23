import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import EditMember from './EditClub/EditMember';
import ClubDescription from './ClubDescription';
import EditClubInfo from './EditClub/EditClubInfo';
import MainSearch from '../../main/SearchBar';
import MainClubList from '../../main/MainClubList';
import ClubLIstItem from '../../main/ClubListItem';

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
                <Route path='/test' element={<MainSearch/>}></Route>
            </Routes>
            <EditMember/>
        </StyledManageLayoutDiv>
    );
};

export default ManageLayout;