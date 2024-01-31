import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMemberMemory } from './context/MemberContext';

const StyledHeaderDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #e7e7e7;
    height: 100px;
    align-items: center;
    & > div:first-child a {
        text-decoration : none;
        color: #3a3a3a;
    }
    & span{
        font-family: 'yg-jalnan';
    }


    #loginBeforeLogo{
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


    #loginAfterLogo{
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

        & > div:nth-child(2){
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-right: 300px;
        width: 100%;
        }

`;

const Header = () => {

    const navigate = useNavigate();

    const {loginMember , setLoginMember}  = useMemberMemory();

    console.log(loginMember);

    const handleLogout = () => {
        // 로그아웃 시 필요한 작업을 수행
        // 예: 세션 정보 삭제, 로그인 상태 초기화 등
    
        // 세션 정보 삭제 예제
        sessionStorage.removeItem('loginMember');

        setLoginMember(null);

        alert("로그아웃 성공");
    
        // 또는 로그인 상태를 관리하는 상태를 초기화
        // setLoggedIn(false);
    
        // 로그아웃 후 리다이렉션 등 추가 작업 수행
        navigate('/');
    }

    const { clubNo } = useParams();

    return (
        <StyledHeaderDiv>
            <div>
                {loginMember === null ? 
                    <Link to={`/main`}>
                        <div id="loginBeforeLogo">
                            <img src="/img/logo.png" alt="여기여기로고" />
                            <span style={{
                                marginLeft : "15px"
                            }}>여기여기</span>
                        </div>
                    </Link>
                : 
                    <Link to={`/main`}>
                        <div id="loginAfterLogo">
                            <img src="/img/logo.png" alt="여기여기로고" />
                            <span style={{
                                marginLeft : "15px"
                            }}>여기? 여기!</span>
                        </div>
                    </Link>                
                }
            </div>         
            <div>
                {loginMember === null ? 
                    <div id="loginBefore">
                        <Link to="/member/login">로그인</Link>        
                        <Link to="/member/join">회원가입</Link>
                    </div>
                : 
                    <div id="loginAfter">
                        <Link to="/member/myPageLayout/myselect">마이페이지</Link>        
                        <Link to="/main" onClick={handleLogout}>로그아웃</Link>
                    </div>
                    
                }
            </div>        
        </StyledHeaderDiv>
    );
};

export default Header;