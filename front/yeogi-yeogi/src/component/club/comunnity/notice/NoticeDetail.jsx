import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useParams } from 'react-router-dom';


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
        width: 90%;
        margin: auto;
        margin-bottom: 2em;
        padding: 1.2em;
        background-color: #fafafa;

        & > div:first-child  {
            margin-bottom: 0.4em;
            & > span {
                font-size: 1.2em;
                font-weight: 700;
            }
        }
        & * {
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }

        & > div {

            & > * {
                margin-left: 30px;
            }
        }

        & svg {
            font-size: 2em;
            color: #999999;
        }
    }

    & h4 {
        font-weight: 600;
    }
`;

const ReviewDiv = styled.div`

`;

const NoticeDetail = (props) => {

    const [notice, setNotice] = useState();
    const {clubNo, noticeNo} = useParams();
    

    useEffect(() => {
        fetch(`http://localhost:8885/notice/detail?clubNo=${clubNo}&memberNo=3&boardNo=${noticeNo}`)
        .then(res => {
            if(!res.ok) {
                throw new Error(res.json());
            }

            return res.json();
        })
        .then(data => {
            console.log(data);
            setNotice(data);
        })
    },[])

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
                    <div>
                        <div>
                            <span>일정 이름</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={icon({name: 'calendar-check', family: 'classic', style: 'regular'})} />
                            <span>2024년 1월 19일</span>
                            <br/>
                            <FontAwesomeIcon icon={icon({name: 'location-dot', family: 'classic', style: 'solid'})} />
                            <span>서울특별시 강남구 테헤란로</span>
                        </div>
                    </div>
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