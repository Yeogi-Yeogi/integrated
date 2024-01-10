import React from 'react';
import styled from 'styled-components';

const StyledImgDiv = styled.div`

    width: 120px;
    height: 120px;
    display: flex;
    justify-content: end;
    align-items: start;
    background-image: url(${(props) => props.src});
    background-size: cover; /* 이미지가 영역을 채우도록 설정 */
    border-radius: 10px;
    margin-right: 0.1em;
    margin-bottom: 0.2em;

    & > span {
        background-color: #b0b0b068;
        z-index: 1;
    }
    
`;
const PreviewImg = ({src}) => {
    return (
        <StyledImgDiv src={src}>

        </StyledImgDiv>
    );
};
export default PreviewImg;