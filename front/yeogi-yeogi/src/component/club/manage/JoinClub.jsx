import React, { useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const StyledJoinModal = styled(ReactModal)`
    overlay: {
        background-color: rgba(153, 75, 75, 0.4);
        width: 100wh;
        height: 100vh;
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
    }

    content: {
        width: 360px;
        height: 180px;
        z-index: 150;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
        background-color: white;
        justify-content: center;
        overflow: auto;
    }
    & > div:first-child{
        display: flex;
        justify-content: center;
        align-items: center;
        & > div:nth-child(1){
            width: 700px;
            height: 700px;
            background-color: yellow;
        }
    }
  `;

const JoinClub = (props) => {
    return (
        <StyledJoinModal 
            isOpen={props.isOpen}
        >
            <div>
                <div></div>
            </div>
        </StyledJoinModal>
    );
};

export default JoinClub;