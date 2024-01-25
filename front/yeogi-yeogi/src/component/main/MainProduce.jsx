import React from 'react';
import styled from 'styled-components';

const StyledMainProduceDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center; /* 부모 요소를 수평으로 가운데 정렬 */


    div{
        margin-top: 10px;
        display: flex;
        align-items: center;
        text-align: center;
    }
    
    img{
        height: 300px;
        width: 400px;
    }

    #i {
        display: flex;
        flex-direction: column; /* 세로 정렬을 위해 flex-direction을 column으로 설정 */
        align-items: center; /* 아이템을 수평으로 가운데 정렬 */
        padding-right: 50px;
    }

    h5, h2 {
        margin: 5px 0; /* 각각의 제목 요소에 대한 간격 조절 */
    }



`;

const MainProduce = () => {
    return (
        <StyledMainProduceDiv>
            <div id="box">
                <div id="i">
                    <div><h5>여기여기로 초대하고 싶다면?</h5></div>
                    <div><h2>참신한 소개글로</h2></div>
                    <div><h2>여기여기를 표현해 보세요!</h2></div>
                </div>    
                <div id="i"><img src="img/yeji1.png" alt='화면 만든 이미지 추가'></img></div>                    
            </div>
            <hr/>              
        </StyledMainProduceDiv>
    );
};

export default MainProduce;