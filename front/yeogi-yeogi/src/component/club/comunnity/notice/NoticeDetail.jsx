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
            width: 120px;
            height: 120px;
            margin: 0.3em;
            margin-top: 1em;
        }
    }
`;

const ReviewDiv = styled.div`

`;

const ModalDiv = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center; /* Center vertically */
    text-align: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #3a3a3ad3;
    z-index: 999; /* Adjust z-index as needed */

    & > img {
        max-width: 100%;
        max-height: 90%;
    }
`;

const NoticeDetail = () => {

    const [notice, setNotice] = useState();
    const {clubNo, noticeNo} = useParams();
    const [isFetching, setIsFetching] = useState(false); 
    const [selectedImage, setSelectedImage] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const vo = JSON.parse(sessionStorage.getItem("loginMember"));
    const memberNo = vo?.no;

    /**
     * 상세 조회
     */
    useEffect(() => {
        if(memberNo) {
            fetch(`http://localhost:8885/notice/detail?clubNo=${clubNo}&memberNo=${memberNo}&boardNo=${noticeNo}`)
            .then(async res => {
                if(!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message);
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setNotice(data);
            })
            .catch(err => {
                alert(err.mssage);
            })
        } else {
            alert('로그인한 회원만 이용가능합니다');
            navigate('/member/login');
        }
    },[])

    /**
     * 리뷰 삭제
     * @returns 
     */
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
        .then(async res => {
            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }

            return res.text();
        })
        .then(data => {
            alert(data);
            navigate(`/club/${clubNo}/commu/board/notice/list`);
        })
        .catch(e => {
            const message = e.message;
            alert(message);
            switch(message) {
                case "회원 전용 서비스입니다. 로그인하세요.":
                    navigate('/member/login');
                    break;
                case "관리자만 이용 가능합니다":
                    navigate(`/club/${clubNo}/commu/board/notice/list`);
                    break;
                default:
                    navigate(`/main`);
                    break;
            }
        })
        .finally(() => {
            setIsFetching(false);
        })
    }

    const showImage = (fileUrl) => {
        setSelectedImage(fileUrl);
        setShow(true);
    }

    return (
        <>
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
                                        <img src={el.fileUrl} key={el.boardImageNo} onClick={() => showImage(el.fileUrl)}/>
                                )
                            }
                        </div>
                    </ContentDiv>
                    <hr/>
                    <ReviewDiv>

                    </ReviewDiv>
                </div>

            </StyledNoticeDetailDiv>
            {
                show &&
                <ModalDiv onClick={() => {setShow(false)}}>
                        <img src={selectedImage} alt="" />
                </ModalDiv>
            }
        </>
    );
};

export default NoticeDetail;