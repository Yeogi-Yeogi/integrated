import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import ReviewList from './common/ReviewList';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';



const StyledNoticeDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;

    & * {
        font-family: 'NanumBarunGothic';
    }

    & > div:first-child {
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
                    margin-right: 0.5em;
                }

                & > img:first-child {
                    width: 45px;
                    height: 45px;
                    border-radius: 10px;
                }

                & > img:not(:first-child) {
                    margin-bottom: 0.3em;
                    margin-right:0.6em;
                }
                & > span.enroll-span {
                    font-size: 0.9em;
                    color: #999999;
                }

            }

            & > div:nth-child(2) {
                

                & > button {
                    text-decoration: none;
                    color: #3a3a3a;
                    font-weight: 400;

                    &:active {
                        color: #6c1895;
                    }
                }
            }
        }

        & > div.pagination-container {
        display: flex;
        justify-content: center;

        & > button {
            text-decoration: none;
            color: #3a3a3a;
            font-size: 1.1em;
            font-weight: 600;
        }
    }
    }

    
`;

const ContentDiv = styled.div`
    
    & > div {
        margin-top: 5em;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        place-items: center center;

        & > img {
            width: 120px;
            height: 120px;
            margin: 0.3em;
            margin-top: 1em;
        }
    }
`;

const ReviewDiv = styled.div`
    margin-top: 5em;
    margin-bottom: 1.5em;

     & > form  {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & button {
            width: 4em;
            height: 4em;
            background-color: #6c1895;
            border-color: #6c1895;
            font-weight: 600;

            &:hover {
                background-color: #5d1582;
            }
        }
        
        & textarea {
            resize: none;
            width: 30em;

            &:focus {
                border-color: #6c1895;
                box-shadow: 0 0 0 0.25rem rgba(108, 24, 149,.25);
            }
        }
     }
     
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

const BoardDetail = () => {

    const [vo, setVo] = useState();
    const {clubNo, boardNo} = useParams();
    const [review, setReview] = useState(); //서버에서 받아오는 리뷰
    const [content, setContent] = useState(); //내용 작성
    const [pageNo, setPageNo] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"));
    const memberNo = loginMember?.no;
    /**
     * 게시글 데이터 가져오기
     */
    useEffect(() => {
        if(memberNo) {
            fetch(`http://localhost:8885/board/detail?memberNo=${memberNo}&boardNo=${boardNo}&clubNo=${clubNo}`)
            .then(async res => {
                if(!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message);
                }
                return res.json();
            })
            .then(data => {
                setVo(data);
            })
            .catch(e => {
                const message = e.message;
                alert(message);
                switch(message) {
                    case "회원 전용 서비스입니다. 로그인하세요.":
                        navigate('/member/login');
                        break;
                    case "게시글이 존재하지 않습니다":
                        navigate(`/club/${clubNo}/commu/board/list`);
                        break;
                    default:
                        navigate("/main");
                        break;
                }
            })
        } else {
            alert('로그인한 회원만 이용가능합니다');
            navigate('/member/login');
        }
    }, [])

    /**
     * 리뷰 가져오는 api 수행
     */
    useEffect(() => {
        if(memberNo) {
            fetch(`http://localhost:8885/review/list/${pageNo}?memberNo=${memberNo}&boardNo=${boardNo}&clubNo=${clubNo}`)
            .then(async res => {
                if(!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message);
                }
                return res.json();
            })
            .then(data => {
                setReview(data);
            })
            .catch(e => {
                const message = e.message;
                alert(message);
                navigate(`/club/${clubNo}/commu/board/list`);
            })
        }
    }, [pageNo])

    /**
     * 수정
     */
    const handleUpdate = () => {
        if(vo) {
            navigate(`/club/${clubNo}/commu/board/edit`, {state: {previous: vo}});
        }
    }

    /**
     * 댓글 삭제
     */
    const handleDelete = () => {

        if(memberNo) {
            const data = {
                memberNo: memberNo,
                clubNo: clubNo,
                boardNo: boardNo
            }

            fetch(`http://localhost:8885/board/delete`, {
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
                navigate(`/club/${clubNo}/commu/board/list`);
            })
            .catch(e => {
                const message = e.message;
                alert(message);
                switch(message) {
                    case "게시글 삭제 실패":
                    case "자신이 작성한 게시글만 삭제가 가능합니다.":
                        break;
                    case "회원 전용 서비스입니다. 로그인하세요.":
                        navigate('/member/login');
                        break;
                    default:
                        navigate("/main");
                        break;
                }
            })
        } else {
            alert('로그인한 회원만 이용가능합니다');
            navigate('/member/login');
        }
    }

    const handleContent = (e) => {
        setContent(e.target.value);
    }

    /**
     * 댓글 작성
     * @param {} e 
     * @returns 
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isFetching) {
            alert('댓글 등록중입니다.');
            return;
        }

        setIsFetching(true);
        
        const data = {
            writerNo: memberNo ,
            boardNo: boardNo,
            clubNo: clubNo,
            content: content
        };

        fetch(`http://localhost:8885/review/add`, {
            method: "POST",
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
            setContent('');
            setPageNo(new Number(0));
        })
        .catch(e => {
            const message = e.message;
            alert(message);
            switch(message) {
                case "회원 전용 서비스입니다. 로그인하세요.":
                    navigate('/member/login');
                    break;
                case "댓글 작성 실패":
                    break;
                default:
                    navigate("/main");
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
                            <img src={`${vo?.memberProfile}`} alt="" />
                            <span>{vo?.memberName}</span>
                            {
                                vo?.creatorYn ?
                                <img src="https://junho-practice.s3.ap-northeast-2.amazonaws.com/creator.png" alt="" width="15" height="15"/>
                                :
                                !vo?.creatorYn && vo?.adminYn ?
                                <img src="https://junho-practice.s3.ap-northeast-2.amazonaws.com/admin.png" alt="" width="15" height="15"/>
                                :
                                null
                            }
                            <span className='enroll-span'>{vo?.enrollDate}</span>
                        </div>
                        {
                            (vo?.mine || vo?.admin) ?
                            <div>
                                <Button variant="link" onClick={handleUpdate}>수정</Button>
                                <Button variant="link" onClick={handleDelete}>삭제</Button>
                            </div>
                            :
                            null
                        }
                    </div>
                    <hr/>
                    <ContentDiv>
                        <h4>{vo?.title}</h4>
                        <p>{vo?.content}</p>
                        <div>
                            {
                                vo?.images.map(el => 
                                    <img src={el.fileUrl} alt="" key={el.boardImageNo} onClick={() => {showImage(el.fileUrl)}}/>
                                )
                            }
                        </div>
                    </ContentDiv>
                    <hr/>
                    <ReviewDiv>
                        <Form onSubmit={handleSubmit}>
                            <Form.Control value={content} as="textarea" name='content' rows={3} onChange={handleContent}/>
                            <Button variant='secondary' type="submit" >작성</Button>
                        </Form>
                    </ReviewDiv>
                    <hr />
                    <ReviewList data={review} setPageNo={setPageNo}/>
                    {
                        <div className='pagination-container'>
                            {
                                pageNo > 0 &&
                                <Button variant='link' onClick={() => {setPageNo(prev => prev <= 0 ? 0 : prev -1)}}>이전</Button>
                            }
                            {
                                !review?.isLast &&
                                <Button variant='link' onClick={() => {setPageNo(prev => prev + 1)}}>다음</Button>
                            }
                        </div>
                    }
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

export default BoardDetail;