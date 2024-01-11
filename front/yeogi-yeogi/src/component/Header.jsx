import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeaderDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #e7e7e7;
    height: 100px;
    & > div:nth-child(1){
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 300px;
        & > img {
            width: 100px;
            height: 75px;
        }
        & > span {
            font-size: 25px;
            font-weight: bold;
        }
    }
    & > div:nth-child(2){
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-right: 300px;

        & > a {
            text-decoration: none;
            color: black;
        }
        & > a:nth-child(1){
            font-weight: bold;
            margin-right: 50px;
        }
        & > a:nth-child(2){
            font-weight: bold;
        }
    }
`;

const Header = () => {
    return (
        <StyledHeaderDiv>
            <div>
                <img src="/img/logo.png" alt="여기여기로고" />
                <span>여기여기(임시)</span>
            </div>
            <div>
                <Link>로그인</Link>        
                <Link>회원가입</Link>        
            </div>         
        </StyledHeaderDiv>
    );
};

export default Header;