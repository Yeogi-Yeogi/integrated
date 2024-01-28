import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JoinClub from '../club/manage/JoinClub';
import { useNavigate } from 'react-router-dom';

const StyledClubListItemDiv = styled.div`
    display: grid;
    grid-template-rows: 1.5fr 1fr;
    width: 200px;
    height: 250px;
    background: #ececec;
    border-radius: 5px;
    //#d2e1ff; #F5F6F8;
    transition: box-shadow 0.5s;
    justify-content: center;
    &:hover{
        cursor: pointer;
        box-shadow: 0px 0px 15px rgb(199, 88, 255);
    }
    & > div:first-child{
        display: flex;
        justify-content: center;
        align-items: center;
        & > img{
            border-radius: 10px;
            width: 180px;
            height: 135px;
        }
        
    }
    & > div:nth-child(2){
        width: 190px;
        display: grid;
        grid-template-rows: 1fr 2fr 0.5fr;
        justify-content: center;

        & > span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
        }
        & > div{
            width: 100%;
            max-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        & > span:first-child{
            font-size: 20px;
            font-weight: bold;
        }
        & > span:last-child{
            font-size: 0.8rem;
            color: #999999;
        }
    }
`;

const ClubListItem = ({club}) => {
    
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"));

    const handleClickClub = () => {
        // 이미 가입한 회원은 모달 안띄우고 바로 모임으로 이동
        console.log("clubNo ::: ", club.no);
        console.log("memberNo ::: ", loginMember.no);
        fetch("http://127.0.0.1:8885/club/checkJoinedClub", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                clubNo : club.no,
                memberNo : loginMember.no,
            })
        })
        .then(resp => resp.text())
        .then(result => {
            if(result === "JOINED"){
                navigate(`/club/${club.no}/commu/board`);
            } else if(result === "NOTJOINED"){
                setOpen(true);
            }
        });
        
    };
    
    const closeModal = () => {
        setOpen(false);
    };

    return (
        <>
            <StyledClubListItemDiv onClick={handleClickClub}>
                <div>
                    <img src={club.fileUrl} alt="" />
                </div>
                <div>
                    <span>{club.name}</span>
                    <div>{club.clubDescription}</div>
                    <span>회원수 {club.memberCount}</span>
                </div>
            </StyledClubListItemDiv>
            <JoinClub isOpen={isOpen} closeModal={closeModal} club={club}/>
        </>
    );
};

export default ClubListItem;