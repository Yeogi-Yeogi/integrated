import React from 'react';
import styled from 'styled-components';

const StyledFooterDiv = styled.div`
    border-top: 1px solid black;
    height: 200px;
`;

const Footer = () => {
    return (
        <StyledFooterDiv>
            footer
        </StyledFooterDiv>
    );
};

export default Footer;