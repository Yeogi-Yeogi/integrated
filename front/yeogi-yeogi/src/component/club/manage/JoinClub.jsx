import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(153, 75, 75, 0.4)',
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
      },
  };
  
const StyledJoinModal = styled(ReactModal)`
    display: grid;
    grid-template-rows: 0.5fr 2fr 4fr 1fr;
    & > div {
        width: 500px;
    }
    & > div:nth-child(1){
        background-color: yellow;
    }
    & > div:nth-child(2){
        background-color: green;
        & > div:first-child{
            width: 100%;
            height: 100%;
            display: grid;
            justify-content: center;
            align-items: center;
            border: 1px solid black;
            grid-template-columns: 1fr 2fr;
            & > img {
                width: 200px;
                height: 170px;
            }
        }
    }
    & > div:nth-child(3){
        background-color: antiquewhite;
    }
    & > div:nth-child(4){
        background-color: #acac13;
    }
  `;

const JoinClub = ({ isOpen, closeModal, club }) => {
    // const { isOpen, closeModal } = props;

    return (
        <StyledJoinModal 
            isOpen={isOpen}
            style={modalStyles}
        >
            <div>
                <button type='button' onClick={closeModal}>닫기</button>
            </div>
            <div>
                <div>
                    <img src={club.fileUrl} alt="" />
                </div>
                <div>zzz</div>
            </div>
            <div>zz</div>
            <div>zz</div>
        </StyledJoinModal>
    );
};

export default JoinClub;