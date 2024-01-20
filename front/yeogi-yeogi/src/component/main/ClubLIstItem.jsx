import React from 'react';
import styled from 'styled-components';

const StyledClubListItemDiv = styled.div`
    display: grid;
    grid-template-rows: 1.5fr 1fr;
    width: 200px;
    height: 250px;
    background: #F5F6F8;
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
    return (
        <StyledClubListItemDiv>
            <div>
                <img src={club.fileUrl} alt="" />
            </div>
            <div>
                <span>{club.name}</span>
                <div>
                {club.clubDescription}
                </div>
                <span>회원수 {club.memberCount}</span>
            </div>
        </StyledClubListItemDiv>
    );
};

export default ClubListItem;