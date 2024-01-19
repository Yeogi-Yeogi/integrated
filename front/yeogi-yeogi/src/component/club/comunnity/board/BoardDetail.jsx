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
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
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
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.json());
                }
                return res.json();
            })
            .then(data => {
                // console.log(data);
                setVo(data);
            })
            .catch(err => {
                console.error(err);
            })
        } else {
            alert('로그인한 회원만 이용가능합니다');
            navigate('/member/login');
        }
    }, [])

    useEffect(() => {
        if(memberNo) {
            console.log(`pageNo = ${pageNo}`);
            fetch(`http://localhost:8885/review/list/${pageNo}?memberNo=${memberNo}&boardNo=${boardNo}&clubNo=${clubNo}`)
            .then(res => {
                console.log(res);
                if(!res.ok) {
                    throw new Error(res.json());
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setReview(data);
            })
        }
    }, [pageNo])

    /**
     * 수정
     */
    const handleUpdate = () => {

    }

    /**
     * 삭제
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
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.data);
                }
    
                return res.text();
            })
            .then(data => {
                alert(data);
                navigate(`/club/${clubNo}/commu/board/list`);
            })
        } else {
            alert('로그인한 회원만 이용가능합니다');
            navigate('/member/login');
        }
    }

    const handleContent = (e) => {
        setContent(e.target.value);
    }

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
        .then(res => {
            if(!res.ok) {
                throw new Error(res.json());
            }

            return res.text();
        })
        .then(data => {
            alert(data);
            setContent('');
            setPageNo(new Number(0));
        })
        .catch(err => {
            alert(err);
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
                            <span>{vo?.enrollDate}</span>
                        </div>
                        {
                            vo?.mine &&
                            <div>
                                <Button variant="link" onClick={handleUpdate}>수정</Button>
                                <Button variant="link" onClick={handleDelete}>삭제</Button>
                            </div>
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
                    <ReviewList data={review?.list} setPageNo={setPageNo}/>
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