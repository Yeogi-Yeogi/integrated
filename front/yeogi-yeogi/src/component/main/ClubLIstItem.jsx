import React from 'react';
import styled from 'styled-components';

const StyledClubLIstItemDiv = styled.div`
    width: 200px;
    height: 250px;
    background-color: #999999;
`;

const ClubLIstItem = () => {
    return (
        <StyledClubLIstItemDiv>
            나는 아이템
        </StyledClubLIstItemDiv>
    );
};

export default ClubLIstItem;