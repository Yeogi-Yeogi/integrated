import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';


const StyledMainLoginDiv = styled.div`

    
`;

const MainLogin = () => {
    return (
        <StyledMainLoginDiv>
            <div>
                <div><h5>여기여기로 초대하고 싶다면?</h5><h2>참신한 소개글로</h2><h2>여기여기를 표현해 보세요!</h2></div>
                <div><img src="" alt='화면 만든 이미지 추가'></img></div>
            </div>
            <hr/>
            <div>
                <div id="ss"><h5>여기여기로 초대하고 싶다면?</h5><h2>참신한 소개글로</h2><h2>소모임을 표현해 보세요!</h2></div>
                <div id="ss"><img src="" alt='화면 만든 이미지 추가'></img></div>
            </div>
            <hr/>
            <div>
                <p1>종범님 소모임 목록 + 검색창 넣는 곳</p1>
            </div>   
        </StyledMainLoginDiv>
    );
};

export default MainLogin;