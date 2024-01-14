import React from 'react';
import styled from 'styled-components';
import EditClubInfo from './EditClubInfo';
import EditMember from './EditMember';


const StyledEditClubLayoutDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;
    margin-bottom: 70px;
`;


const EditClubLayout = () => {
    return (
        <StyledEditClubLayoutDiv>
            <EditClubInfo/>
            <EditMember/>
        </StyledEditClubLayoutDiv>
    );
};

export default EditClubLayout;