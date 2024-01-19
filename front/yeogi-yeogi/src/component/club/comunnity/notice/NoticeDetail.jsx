import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate, useParams } from 'react-router-dom';


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

                & > span:nth-child(4) {
                    font-weight: lighter;
                    color: #999999;
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

    & > div.img-div {
        width: 100%;
        background-color: #ffffff;
        & > img {
            width: 100%;
        }
    }
`;

const ReviewDiv = styled.div`

`;

const NoticeDetail = () => {

    const [notice, setNotice] = useState();
    const {clubNo, noticeNo} = useParams();
    const [isFetching, setIsFetching] = useState(false); 
    const navigate = useNavigate();
    const vo = JSON.parse(sessionStorage.getItem("loginMember"));
    const memberNo = vo?.no;

    useEffect(() => {

        if(memberNo) {
            fetch(`http://localhost:8885/notice/detail?clubNo=${clubNo}&memberNo=${memberNo}&boardNo=${noticeNo}`)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.data);
                }
    
                return res.json();
            })
            .then(data => {
                console.log(data);
                setNotice(data);
            })
            .catch(err => {
                console.error(err);
            })
        } else {
            alert('로그인한 회원만 이용가능합니다');
            navigate('/member/login');
        }
    },[])

    const deleteNotice = () => {

        if(isFetching) {
            alert('삭제중입니다.');
            return;
        }

        setIsFetching(true);
        const data = {
            memberNo: memberNo,
            clubNo: clubNo,
            boardNo: noticeNo
        }

        fetch(`http://localhost:8885/notice/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(res.text());
            }

            return res.text();
        })
        .then(data => {
            alert(data);
            navigate(`/club/${clubNo}/commu/board/notice/list`);
        })
        .catch(err => {
            alert(err);
        })
        .finally(() => {
            setIsFetching(false);
        })
    }

    return (
        <StyledNoticeDetailDiv>
            <div>
                <div>
                    <div>
                        <img src={notice?.memberProfile} alt="" />
                        <span>{notice?.memberName}</span>
                        <span>{notice?.enrollDate}</span>
                        <span>조회수 {notice?.hit}</span>
                    </div>
                    {
                        notice?.mine && 
                        <div>
                            <Button variant="link">수정</Button>
                            <Button variant="link" onClick={deleteNotice}>삭제</Button>
                        </div>
                    }
                </div>
                <hr/>
                <ContentDiv>
                    {
                        notice?.schedule &&
                        <div>
                            <div>
                                <span>{notice?.schedule.title}</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={icon({name: 'calendar-check', family: 'classic', style: 'regular'})} />
                                <span>{notice?.schedule.startTime}</span>
                                <br/>
                                <FontAwesomeIcon icon={icon({name: 'location-dot', family: 'classic', style: 'solid'})} />
                                <span>{notice?.schedule.location}</span>
                            </div>
                        </div>
                    }
                    <h4>{notice?.title}</h4>
                    <p>{notice?.content}</p>
                    <div className='img-div'>
                        {
                            
                            notice?.list.map(el => 
                                    <img src={el.fileUrl} key={el.boardImageNo}/>
                            )
                        }
                    </div>
                </ContentDiv>
                <hr/>
                <ReviewDiv>

                </ReviewDiv>
            </div>

        </StyledNoticeDetailDiv>
    );
};

export default NoticeDetail;