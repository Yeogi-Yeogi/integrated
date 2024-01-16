import React from 'react';
import styled from 'styled-components';
import EditClubInfo from './EditClubInfo';
import EditMember from './EditMember';
import { Route, Routes } from 'react-router-dom';


const StyledEditClubDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;
    margin-bottom: 70px;
`;


const EditClub = () => {
    return (
        <StyledEditClubDiv>
            <EditClubInfo />
            <EditMember/>
        </StyledEditClubDiv>
    );
};

export default EditClub;