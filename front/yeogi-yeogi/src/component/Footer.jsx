import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooterDiv = styled.div`
    background-color: lightgray;
    border-top: 1px solid black;
    height: 200px;
    .container{
        display: grid;
        text-align: center;
    }
`;

const Footer = () => {
    return (
        <StyledFooterDiv>
            <div class="container">
                <div>
                    <p>&copy; 2024 yeogi-yeogi Website. All rights reserved.</p>
                    <p>서비스 이용약관</p>
                    <p>개인정보처리방침</p>
                </div>
                <div>
                    <p>대표이사:심원용</p>
                    <p>사업자번호:129-86666</p>
                </div>           
            </div>           
        </StyledFooterDiv>
    );
};

export default Footer;