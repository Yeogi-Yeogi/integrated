import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';


const StyledNoticeDetailDiv = styled.div`
    width: 100%;

    & * {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    & > table {
        width: 100%;
    }
`;
const NoticeDetail = () => {
    return (
        <StyledNoticeDetailDiv>
            <div>
                <div>
                    <div>
                        <img src={src} alt="" />
                        <span>관리자</span>
                        <span>2024. 12. 24. 22:54</span>
                    </div>
                    <div>
                        <Button variant="link">수정</Button>
                        <Button variant="link">삭제</Button>
                    </div>
                </div>
            </div>
        </StyledNoticeDetailDiv>
    );
};

export default NoticeDetail;