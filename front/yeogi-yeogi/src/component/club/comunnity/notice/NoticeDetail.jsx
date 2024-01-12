import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import ScheduleItem from '../schedule/ScheduleItem';


const StyledNoticeDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;

    & * {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    & > div {
        margin: auto;
        width:70%;
        //첫번째 div
        & > div:first-child {
            display: flex;
            justify-content: space-between;

            & > div:first-child {

                display: flex;
                align-items: end;
                
                & > * {
                    margin-right: 0.8em;
                }

                & > img {
                    width: 45px;
                    height: 45px;
                    border-radius: 10px;
                }
            }

            & > div:nth-child(2) {
                

                & > button {
                    text-decoration: none;
                    color: #3a3a3a;
                    font-weight: 600;

                    &:active {
                        color: #6c1895;
                    }
                }
            }
        }
    }
`;

const ContentDiv = styled.div`

    & > div {
        width: 100%;
    }
`;

const ReviewDiv = styled.div`

`;

const NoticeDetail = (props) => {
    return (
        <StyledNoticeDetailDiv>
            <div>
                <div>
                    <div>
                        <img src={props.src} alt="" />
                        <span>관리자</span>
                        <span>2024. 12. 24. 22:54</span>
                    </div>
                    <div>
                        <Button variant="link">수정</Button>
                        <Button variant="link">삭제</Button>
                    </div>
                </div>
                <hr/>
                <ContentDiv>
                    <ScheduleItem />
                    <h4>제목 제목 제목 제목 제목 </h4>
                    <p>내용용 내용용 내용용 내용용 내용용 </p>
                    {/* <div>
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                    </div> */}
                </ContentDiv>
                <hr/>
                <ReviewDiv>

                </ReviewDiv>
            </div>

        </StyledNoticeDetailDiv>
    );
};

export default NoticeDetail;