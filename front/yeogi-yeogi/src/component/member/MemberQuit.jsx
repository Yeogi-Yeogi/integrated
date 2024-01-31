import React, { useState } from 'react';
import styled from 'styled-components';
import MyPageSideBar from '../club/comunnity/board/common/MyPageSideBar';
import { useNavigate } from 'react-router-dom';
import { useMemberMemory } from '../context/MemberContext';

const StyledMemberQuitDiv =styled.div`
    width: 100%;
    margin: auto;
        
    & > div {
        width: 70em;
        display: flex;
        justify-content:center;
        margin: auto;       
    }

    #quit{
        width: 609px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;        
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
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

    let isFetching = false;
    const {setLoginMember}  = useMemberMemory();
    const navigate = useNavigate();
    
    const handleInputQuit = (e) => {
        e.preventDefault();

        const currentLoginMember = JSON.parse(sessionStorage.getItem("loginMember"));
         //입력한 패스워드
         const password = e.target.pwd.value;
         console.log(document.getElementById('pwd').value);
         console.log(password);

        if(currentLoginMember.pwd !== password){
            alert("비밀번호 불일치. 회원탈퇴 불가");
            return;
        }

        if(isFetching){
            alert('회원탈퇴 이미 진행');
            return;
        }else{
            isFetching = true;
        }
      
        // 회원탈퇴 실행하는 패치
        fetch("http://127.0.0.1:8885/member/quit", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({no : currentLoginMember.no})
        })
        .then( resp => {
            if(!resp.ok){
                // throw new error("회원가입 fetch 실패...");
            }
            return resp.json();
        })
        .then( data => {
            if(data.msg === "good"){
                
                alert("회원 탈퇴 성공!");
                sessionStorage.removeItem("loginMember");
                setLoginMember(null);
                navigate("/main");
            }else if (data.msg === "bad"){
                alert("기존의 비밀번호가 일치하지 않습니다. 회원탈퇴 실패")
            }else {
                alert("알 수 없는 오류로 회원 탈퇴 실패.");
            }
        })
        .catch((e) => {
            console.log(e);
            alert("회원 탈퇴 실패");
        })
        .finally( () => {
            isFetching = false;
        })
    };

    return (
        <StyledMemberQuitDiv>
            <div>
                <MyPageSideBar/>
                <div id="quit">
                <form onSubmit={handleInputQuit}>
                    <h2>회원 탈퇴</h2>
                    <p>정말로 회원 탈퇴를 하시겠습니까?</p>
                    <p> 해당 조치는 되돌릴 수 없습니다.</p>
                    
                    <label htmlFor="password">비밀번호:</label>
                    <input type="password" id="pwd" name="pwd" required/>
                    <button type="submit" id="editbutton">회원 탈퇴</button>
                </form>
                </div>                
            </div> 
        </StyledMemberQuitDiv>
    );
};

export default MemberQuit;