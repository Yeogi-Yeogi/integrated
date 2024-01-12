import React from 'react';
import { useNavigate } from 'react-router';
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

    & > div:nth-child(2) {
        width: 15em;
        height: 15em;
        background-image: url('https://cdn.crowdpic.net/list-thumb/thumb_l_F25C5FD45B78842BE8B499E04852D8CB.jpg');
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        

        & > div {
            width:100%;
            height: 100%;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: rgba(58, 58, 58, 0.3);
        }
    }
`;
const BoardListItem = () => {

    const navigate = useNavigate();

    const handleClick = (no) => {
        navigate('/club/commu/board/detail', no);
    }
    return (
        <StyledBoardListItemDiv onClick={handleClick}>            
            <FirstDiv>
                <img src="data:image/jpeg;base64,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" alt="" width="45" height="45"/>
                <UserSpan>사용자</UserSpan>
                <DateSpan>2023.12.24 22:59</DateSpan>
            </FirstDiv>
            <hr />
            <SecondDiv>
                <div>
                    <h2>제목 제몾 제목</h2>
                    <p>게시글이에요 게시글이에요 게시글이에요 </p>
                    <div>댓글 10</div>
                </div>
                <div>
                    <div>
                        <span>+5</span>
                    </div>
                </div>
            </SecondDiv>
        </StyledBoardListItemDiv>
    );
};

export default BoardListItem;