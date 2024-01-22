import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(172, 172, 172, 0.4)',
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        position: 'fixed',
        top: 0,
        left: 0,
      },
      content: {
        width: '500px',
        height: '700px',
        zIndex: 150,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
        backgroundColor: 'white',
        justifyContent: 'center',
        overflow: 'auto',
        outline: 'none'
      },
  };
  
const StyledJoinModal = styled(ReactModal)`
    display: grid;
    grid-template-rows: 0.5fr 2fr 4fr 1fr;
    background-color: #FAFAFA;
    & > div {
        width: 500px;
    }
    & > div:nth-child(1){
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
        & > button {
            border: none;
            background-color: white;
            text-align: right;
        }
    }
    & > div:nth-child(2){
        /* background-color: green; */
        width: 100%;
        height: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        grid-template-columns: 1.5fr 2fr;
        & > div:first-child{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            & > img {
                width: 90%;
                height: 90%;
                border: 1px solid black;
                border-radius: 15px;
            }
        }
        & > div:nth-child(2){
            padding-left: 30px;
            display: grid;
            & > span {
                color: #5F5757;
                font-size: 0.9rem;
            }
            & > h3 {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    & > div:nth-child(3){
        display: flex;
        justify-content: center;
        align-items: center;
        & > div{
            width: 90%;
            height: 90%;
            border: 1px solid black;
            border-radius: 10px;
            background-color: #F3F1F1;
            padding: 50px;
            font-size: 0.9rem;
        }
    }
    & > div:nth-child(4){
        display: flex;
        justify-content: center;
        align-items: center;
        & > button{
            width: 300px;
            height: 50px;
            border: none;
            color: white;
            font-weight: bold;
            border-radius: 20px;
            background-color: #6C1895;
            
        }
    }
    
  `;

const JoinClub = ({ isOpen, closeModal, club}) => {

    const signupClub = () => {
        alert("가입하기ㅋㅋ");
    };
    return (
        <StyledJoinModal 
            isOpen={isOpen}
            style={modalStyles}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <div>
                <button type='button' onClick={closeModal}>X</button>
            </div>
            <div>
                <div>
                    <img src={club.fileUrl} alt="" />
                </div>
                <div>
                    <h3>{club.name}</h3>
                    <span>모임장 : {club.nick}</span>
                    <span>인원 : {club.memberCount} / {club.signupLimit}</span>
                    <span>가입연령 : {club.ageLimit}세 이상</span>
                    <span>개설일 : {club.enrollDate}</span>
                    <div style={{fontStyle:"italic"}}>카테고리 보여주는곳</div>
                </div>
            </div>
            <div>
                <div>
                    {club.clubDescription}
                </div>
            </div>
            <div>
                <button type='button' onClick={signupClub}>가입하기</button>
            </div>
        </StyledJoinModal>
    );
};

export default JoinClub;