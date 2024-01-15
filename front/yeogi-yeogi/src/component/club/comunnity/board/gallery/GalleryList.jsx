import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledGalleryListDiv = styled.div`
    width: 30%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    place-items: center center;

    & > img {
        margin: 0.5em;
        width: 150px;
        height: 150px;
        border-radius: 10px;
    }
`;
const GalleryList = () => {

    const navigate = useNavigate();

    return (
        <StyledGalleryListDiv>
            {/* 이미지 클릭시 해당 게시글로 이동 */}
            <img src="" alt="" onClick={() => {navigate("/club/1/commu/board/detail")}}/>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
        </StyledGalleryListDiv>
    );
};

export default GalleryList;