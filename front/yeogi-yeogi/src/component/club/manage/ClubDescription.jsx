import React from 'react';
import styled from 'styled-components';

const StyledClubDescriptionDiv = styled.div`

    width: 1000px;
    height: 375px;
    margin-bottom: 70px;
    border: 1px solid black;
    display: grid;
    grid-template-columns: 350px 650px;
    box-sizing: content-box;

    & > div:nth-child(1){
        background-color: pink;
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
        background-color: aquamarine;
        display: grid;
        
        width: 100%;
        height: 100%;
        padding: 10px;
        & > div:nth-child(1){
            display: grid;
            grid-template-columns: 350px 150px 150px;
            height: 100%;
            width: 100%;
            & > span {

            }
        }
    }

`;

const ClubDescription = () => {
    return (
        <StyledClubDescriptionDiv>
            <div>
                <img src="" alt="" />
            </div>
            <div>
                <div>
                   <span></span> 
                   <span></span> 
                   <span></span> 
                </div>
                <div></div>
                <div></div>
            </div>
        </StyledClubDescriptionDiv>
    );
};

export default ClubDescription;