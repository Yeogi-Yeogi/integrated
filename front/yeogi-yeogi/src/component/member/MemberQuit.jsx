import React from 'react';
import styled from 'styled-components';
import MyPageSideBar from '../club/comunnity/board/common/MyPageSideBar';

const StyledMemberQuitDiv =styled.div`
    width: 100%;
    margin: auto;

    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
    
    & > div {
        width: 70em;
        display: flex;
        justify-content:space-evenly;
        margin: auto;       
    }

    #quit{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left:200px
    }

    form {
        max-width: 400px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
    }

    button {
        background-color:#6C1895;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        background-color: #6C1895;
    }
    
`;    

const MemberQuit = () => {
    return (
        <StyledMemberQuitDiv>
            <div>
                <MyPageSideBar/>
                <div id="quit">
                <form action="탈퇴처리페이지.html" method="post">
                    <h2>회원 탈퇴</h2>
                    <p>정말로 회원 탈퇴를 하시겠습니까?</p>
                    <p> 해당 조치는 되돌릴 수 없습니다.</p>
                    
                    <label htmlFor="password">비밀번호:</label>
                    <input type="password" id="password" name="password" required/>
                    <button type="submit">회원 탈퇴</button>
                </form>
                </div>                
            </div> 
        </StyledMemberQuitDiv>
    );
};

export default MemberQuit;