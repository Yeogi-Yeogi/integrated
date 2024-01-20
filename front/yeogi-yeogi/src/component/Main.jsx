import React from 'react';
import styled from 'styled-components';

const StyledMainDiv = styled.div`
    /* background-color: #8a8aaf; */
`;

const Main = () => {
    return (
        <StyledMainDiv>
            <div>
                <div><h5>여기여기로 초대하고 싶다면?</h5><h2>참신한 소개글로</h2><h2>여기여기를 표현해 보세요!</h2></div>
                <div><img src="" alt='화면 만든 이미지 추가'></img></div>
            </div>
            <hr/>
            <div>
                <div><h2>여기여기로</h2><h2>자기개발과 취미생활을</h2><h2>시작해 보세요.</h2><h5>함께하는,보다 행복한 삶</h5></div>
                <div><img src="/img/yeji1.png" alt='화면 만든 이미지 추가'></img></div>
            </div>            
        </StyledMainDiv>
    );
};

export default Main;