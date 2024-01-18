import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledBoardListItemDiv = styled.div`
    margin: auto;
    margin-top: 0.5em;
    margin-bottom: 4em;
    & * {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    &:hover {
        cursor: pointer;
    }
`;

const FirstDiv = styled.div`
    display: inline;
    
    & > * {
        margin: 0.3em;
    }

`;

const UserSpan = styled.span`
    font-size: 1.5em;
    font-weight: 500;
`;

const DateSpan = styled.span`
    color: #999999;
`;

const SecondDiv = styled.div`
    display: flex;
    justify-content: space-between;

    & > div > * {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }


`;

const ImageDiv = styled.div`
    width: 15em;
    height: 15em;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    

    & > div {
        width:100%;
        height: 100%;
        border-radius: 10px;
        display: flex;
        z-index: 1;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: rgba(58, 58, 58, 0.3);
    }
`;
const BoardListItem = ({data}) => {

    const navigate = useNavigate();
    const {clubNo} = useParams();

    const handleClick = (no) => {
        navigate(`/club/${clubNo}/commu/board/detail/${no}`);
    }
    return (
        <StyledBoardListItemDiv onClick={() => {handleClick(data.boardNo)}}>            
            <FirstDiv>
                <img src={data.memberProfile} alt="" width="45" height="45"/>
                <UserSpan>{data.memberName}</UserSpan>
                <DateSpan>{data.enrollDate}</DateSpan>
            </FirstDiv>
            <hr />
            <SecondDiv>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.content}</p>
                    <div>댓글 {data.hit}</div>
                </div>
                <ImageDiv src={data.imagePath}>
                    {
                        data?.imageCount !== -1 && 
                        <div>
                            <span>+{data.imageCount}</span>
                        </div>
                    }
                    
                </ImageDiv>
            </SecondDiv>
        </StyledBoardListItemDiv>
    );
};

export default BoardListItem;