import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberLoginDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: 70px;
    width: 100vw;

    & #table-container{
        border-radius: 100px; /* 원하는 값으로 조절 */
        /* overflow: hidden;   /* border-radius 적용을 위해 overflow 속성 추가 */
        width: 300px;        /* 필요에 따라 조절 */
        height: 800px;
        margin: auto;      /* 가운데 정렬을 위해 추가 */
        /* border: 4px solid black; */
        /* background-color:#edd1f4; */

        & input {
        border: 2px solid #999999;
        border-radius: 10px;
        width: 500px;
        height: 50px;
        margin: 10px;
        padding: 10px;
        outline: none;
        font-size: 0.8rem;        
        }

        & td {
            text-align: center;
            font-weight: bolder;
            font-size: 25px;
        }
        
        td:nth-child(1){
            width: 10px;
            height: 10px;
        }

        td:nth-child(1) > div{
            size: 100%
        }

        & > div:nth-child(1){
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-left: 300px;
           
            & > img {
                width: 5px;
                height: 5px;
            }
            & > span {
                font-size: 100px;
                font-weight: bold;
            }
        }

        /* .custom-td {
            height: 100px;
            width: 100px;
        }

        .logo-td {
            height: 100px;
            width: 200px;
        } */

    }

    #loginbutton{
        color: #fff;
        background-color: #6C1895;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        border: none;
        width: 100px;
        height: 40px;
        border-radius: 10px;
        font-size: 16px;
    }
   
`;

const MemberLogin = () => {

    let isFetching = false;

    //로그인 할 때 기본값 세팅
    const [vo,setVo] = useState({
        id :"",
        pwd: ""
    })
    const navigate = useNavigate();

    //input태그의 값이 변할 때마다 값 변함
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

        fetch("http://127.0.0.1:8885/member/login", {
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
                sessionStorage.setItem("loginMember", JSON.stringify(data.loginMember));
                alert("로그인 성공!");
                navigate("/main");
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
            <form onSubmit={handleMemberLoginSubmit} >
                <table id="table-container">
                    <tr>
                        <td colspan="2">
                            <div><img src="/img/logo.png" alt="여기여기로고"/>
                            <span>여기여기(임시)</span>
                            </div>
                        </td>                    
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="text" name="id"  placeholder='아이디를 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="password" name="pwd"  placeholder='비밀번호를 입력하세요'onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td colspan="2"><input type="submit" id="loginbutton" value='로그인'/></td>
                    </tr>
                </table>                           
            </form>            
        </StyledMemberLoginDiv>
    );
};

export default MemberLogin;