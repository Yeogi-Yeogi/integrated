import React from 'react';
import styled from 'styled-components';

const StyledMainProduceDiv = styled.div`
    width: 100%;
    div{
        display: flex;
        align-items: center;
        text-align: center;
    }



`;

const MainProduce = () => {
    return (
        <StyledMainProduceDiv>
            <div>
                <div id="t">
                    <div><h5>여기여기로 초대하고 싶다면?</h5></div>
                    <div><h2>참신한 소개글로</h2><h2>여기여기를 표현해 보세요!</h2></div>
                </div>    
                    <div id="i"><img src="yeji1.png" alt='화면 만든 이미지 추가'></img></div>                    
            </div>
            <hr/>          
        </StyledMainProduceDiv>
    );
};

export default MainProduce;