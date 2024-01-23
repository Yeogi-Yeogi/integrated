import React from 'react';
import styled from 'styled-components';

const StyledMainProduceDiv = styled.div`
    width: 100%;
    div{
        text-align: center;
    }



`;

const MainProduce = () => {
    return (
        <StyledMainProduceDiv>
            <div>
                <div><h5>여기여기로 초대하고 싶다면?</h5><h2>참신한 소개글로</h2><h2>여기여기를 표현해 보세요!</h2></div>
                <div><img src="" alt='화면 만든 이미지 추가'></img></div>
                <hr/>
            </div>
        </StyledMainProduceDiv>
    );
};

export default MainProduce;