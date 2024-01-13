import React from 'react';
import styled from 'styled-components';
import EditClubInfo from './EditClubInfo';
import EditMember from './EditMember';


const StyledEditClubLayoutDiv = styled.div`
    width: 100%;
    height: 100%;
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