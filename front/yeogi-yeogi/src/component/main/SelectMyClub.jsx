import React from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const StyledSelectMyClubDiv = styled.div`
  .bigBox{
    display: block;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0px;
    line-height: 1;
}
  .titlePlusBox{
    flex: 1 1 0%;
    display: flex;
  }

  #title{
    cursor: pointer;
  }

  #plus{
    align-items: center;
    margin-left: 100px;
  }

  .selectListBox {
  display: flex;
  justify-content: space-between;
}

.innerBox > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.innerBox {
  margin-bottom: 10px; /* 필요에 따라 간격을 조절하세요 */
}
.innerBox:first-child {
  margin-right: 20px; /* 이미지 div와의 간격을 조절하세요 */
}

    
`;

const SelectMyClub = () => {
      
    return (
        <StyledSelectMyClubDiv>
          <div class="bigBox">
            <div class="titlePlusBox">
              <div id="title">
                <strong>여기여기에서 내 모임을 조회</strong>
              </div>
              <div id="Plus">
                <button type='button'>더보기</button>
              </div>
            </div>
            <div class="selectListBox">
              <div class="innerBox">
                <div>이미지</div>
                <div id='list'>
                  <div>낙천주의자 클럽</div>
                  <div>누구나지금바로행복해질수</div>
                  <div>멤버1504</div>
                  <div>리더리더</div>
                  <div>소통밴드</div>
                </div>
              </div>
              <div class="innerBox">
                <div>이미지</div>
                <div id='list'>
                  <div>낙천주의자 클럽</div>
                  <div>누구나지금바로행복해질수</div>
                  <div>멤버1504</div>
                  <div>리더리더</div>
                  <div>소통밴드</div>
                </div>
              </div>
              <div class="innerBox">
                <div>이미지</div>
                <div id='list'>
                  <div>낙천주의자 클럽</div>
                  <div>누구나지금바로행복해질수</div>
                  <div>멤버1504</div>
                  <div>리더리더</div>
                  <div>소통밴드</div>
                </div>
              </div>
              <div class="innerBox">
                <div>이미지</div>
                <div id='list'>
                  <div>낙천주의자 클럽</div>
                  <div>누구나지금바로행복해질수</div>
                  <div>멤버1504</div>
                  <div>리더리더</div>
                  <div>소통밴드</div>
                </div>
              </div>
            </div>
          </div>
        </StyledSelectMyClubDiv>
    );
};

export default SelectMyClub;