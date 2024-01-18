import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMemberMemory } from './context/MemberContext';

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

    #loginBefore{
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


    #loginAfter{
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

    /* & > div:nth-child(2){
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
    } */
`;

const Header = () => {

    const {loginMember , setLoginMember}  = useMemberMemory();

    console.log(loginMember);

    const { clubNo } = useParams();

    return (
        <StyledHeaderDiv>
            <div>
                <img src="/img/logo.png" alt="여기여기로고" />
                <span><Link to={`/club/${clubNo}/commu/board/list`}>여기여기</Link></span>
            </div>
            <div>
                {loginMember === null ? (
                    <div id="loginBefore">
                        <Link to="/member/login">로그인</Link>        
                        <Link to="/member/join">회원가입</Link>
                    </div>
                ): (
                    <div id="loginAfter">
                        <Link to="/member/myselect">마이페이지</Link>        
                        <Link to="/member/logout">로그아웃</Link>
                    </div>
                    )
                }
            </div>        
        </StyledHeaderDiv>
    );
};

export default Header;