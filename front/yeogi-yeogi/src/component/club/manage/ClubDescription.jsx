import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const StyledClubDescriptionDiv = styled.div`

    width: 1000px;
    height: 375px;
    margin-bottom: 70px;
    display: grid;
    grid-template-columns: 350px 650px;
    box-sizing: content-box;
    margin: auto;

    & > div:nth-child(1){
        display: flex;
        justify-content: center;
            align-items: center;
        & > img {
            width: 250px;
            height: 250px;
            background-color: white;
            border: 2px solid #999999;
            margin-top: 30px;
            margin-bottom: 30px;
            border-radius: 10px;
        }
    }

    & > div:nth-child(2){
        display: grid;
        align-items: center;
        grid-template-rows: 1fr 2fr 1fr;
        width: 100%;
        height: 100%;
        padding: 10px;
        & > div:nth-child(1){
            display: grid;
            grid-template-columns: 4.8fr 0.8fr 0.8fr 0.8fr;
            height: 100%;
            width: 100%;
        }
        & > div:nth-child(2){
            width: 100%;
            height: 100%;
            max-height: 177.5px;
            padding: 20px;
            display: flex;
            justify-content: center;
            background-color: #f6f6f6;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        & > div:nth-child(3){
            display: flex;
            margin-right: 20px;
            justify-content: flex-end;
        }
    }

    #editClubBtn{
        color: #fff;
        background-color: #6C1895;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        border: none;
        width: 130px;
        height: 40px;
        border-radius: 10px;
        font-size: 16px;
    }

    #quitClubBtn{
        margin-left: 20px;
        color: #fff;
        background-color: #c80000;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        border: none;
        width: 130px;
        height: 40px;
        border-radius: 10px;
        font-size: 16px;   
    }

    ::-webkit-scrollbar {
        width: 10px;  
    }

    ::-webkit-scrollbar-thumb {
        background: #841db8;
        border-radius: 10px; 
    }

    ::-webkit-scrollbar-track {
        background: rgba(220, 20, 60, .1); 
    }
`;

const ClubDescription = () => {

    const str = window.sessionStorage.getItem("loginMember");
    const vo = JSON.parse(str);
    const memberNo = vo?.no;

    const { clubNo } = useParams();
    const navigate = useNavigate();
    const [clubInfo, setClubInfo] = useState({});

    const checkMemberDto = {
        "clubNo" : clubNo,
        "memberNo" : memberNo
    };

    const [checkMember, setCheckMember] = useState({});

    console.log(checkMemberDto);

    useEffect(() => {
        fetch("http://127.0.0.1:8885/club/checkMember", {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkMemberDto)
        })
        .then(resp => resp.json())
        .then(checkMember => {
            console.log("checkMember ", checkMember);
            setCheckMember(checkMember);
        })
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8885/club/management/" + clubNo)
        .then(resp => resp.json())
        .then(clubInfo => {
            setClubInfo(clubInfo);
        })
    }, []);


    const editClub = () => {
        navigate("/club/" + clubNo + "/manage/editClub");
    }

    const quitClubConfirm = () => {
        Swal.fire({
            title: '정말 탈퇴 하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6', 
            cancelButtonColor: '#d33', 
            confirmButtonText: '확인',
            cancelButtonText: '취소', 
         }).then(result => {
            if (result.isConfirmed) { 
                quitClub();
            }
         });
    }

    const quitClub = () => {
        fetch("http://127.0.0.1:8885/club/quitClub", {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "no" : clubNo,
                memberNo,
            }),
        })
        .then(resp => resp.text())
        .then(result => {
            if(result === '1'){
                Swal.fire({
                    title: '클럽을 탈퇴하셨습니다',
                    icon: 'info',
                    confirmButtonColor: '#3085d6', 
                    cancelButtonColor: '#d33', 
                    confirmButtonText: '확인',
                }).then(result => {
                    if (result.isConfirmed) { 
                        navigate("/");
                    }
                });
            }
        })
    }

    return (
        <StyledClubDescriptionDiv>
            <div>
                <img src={clubInfo.fileUrl} alt="" />
            </div>
            <div>
                <div>
                        <h2 style={{color:"#3A3A3A",  margin: "auto", textAlign: "center"}}>
                            {clubInfo.name}
                        </h2>
                        <span style={{color:"#3A3A3A", margin: "auto"}}>
                            모임장 {clubInfo.nick}
                        </span>
                        <span style={{color:"#999999", margin: "auto"}}>
                            회원수 {clubInfo.memberCount}
                        </span> 
                </div>
                <div>
                    <span>
                        {clubInfo.clubDescription}
                    </span>
                </div>
                <div>
                    {checkMember.adminYn === 'Y' ? (
                        <button id='editClubBtn' type='button' onClick={editClub}>모임 관리하기</button>
                        ) : (
                            null
                        )
                    }
                    {checkMember.creatorYn === 'N' ? (
                        <button id='quitClubBtn' type='button' onClick={quitClubConfirm}>탈퇴하기</button>
                        ) : ( null )
                    }
                </div>
            </div>
        </StyledClubDescriptionDiv>
    );
};

export default ClubDescription;