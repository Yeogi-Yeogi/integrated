import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberLoginDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    & > div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    form > {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    loginbutton > {
        border-radius: 
    }
`;

const MemberLogin = () => {

    let isFetching = false;
    const [vo,setVo] = useState({
        id :"",
        pwd: ""
    })
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const{name, value} = event.target;

        setVo({
            ...vo,
            [name] : value
        });
    }
    //로그인 전 화면으로 넘어가기
    const handleMemberLoginSubmit = (event) => {
        event.preventDefault();

        if(isFetching){
            alert('로그인이 이미 진행');
            return;
        }else{
            isFetching = true;
        }

        fetch("http://127.0.0.1:8888/yeogi/member/login", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(vo)
        })
        .then( resp => {
            if(!resp.ok){
                // throw new error("로그인 fetch 실패...");
            }
            return resp.json();
        })
        .then( data => {
            if(data.msg === "good"){
                alert("로그인 성공!");
                navigate("/");
            }else{
                alert("로그인실패..");
                navigate("/failpage");
            }
        })
        .catch((e) => {
            console.log(e);
            alert("로그인 실패");
        })
        .finally( () => {
            isFetching = false;
        })
        ;

    };
    
    return (
        <StyledMemberLoginDiv>
            <div>
                <div>
                    <div><img src="/img/logo.png" alt="여기여기로고"/></div>
                    <span>여기여기</span>
                </div>
                <form onSubmit={handleMemberLoginSubmit}>
                    <div>아이디<input type="text" name="id"  placeholder='아이디를 입력하세요' onChange={handleInputChange}/></div>
                    <div>비밀번호<input type="password" name="pwd"  placeholder='비밀번호를 입력하세요'onChange={handleInputChange}/></div>
                    <div><input type="submit" id="loginbutton" value='로그인'/></div>
                </form>        
            </div>
        </StyledMemberLoginDiv>
    );
};

export default MemberLogin;