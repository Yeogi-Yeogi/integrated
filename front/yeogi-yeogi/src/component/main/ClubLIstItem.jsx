import React from 'react';
import styled from 'styled-components';

const StyledClubListItemDiv = styled.div`
    display: inline-block;
    width: 200px;
    height: 250px;
    background: #F5F6F8;
`;

const ClubListItem = () => {
    return (
        <StyledClubListItemDiv>
            <h3>나는 아이템</h3>
        </StyledClubListItemDiv>
    );
};

export default ClubListItem;