import React, { useState } from 'react';
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

const BoardDetail = () => {

    const [vo, setVo] = useState();
    const {clubNo, boardNo} = useParams();
    const [review, setReview] = useState();
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8885/board/detail?memberNo=2&boardNo=${boardNo}&clubNo=${clubNo}`)
        .then(res => {
            if(!res.ok) {
                throw new Error(res.json());
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            setVo(data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [])

    /**
     * 수정
     */
    const handleUpdate = () => {

    }

    /**
     * 삭제
     */
    const handleDelete = () => {

    }

    const handleReview = (e) => {
        setReview(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isFetching) {
            alert('게시글 등록중입니다.');
            return;
        }

        setIsFetching(true);

        const data = {
            writerNo: "3",
            boardNo: boardNo,
            clubNo: clubNo,
            content: review
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
        })
        .then(() => {
            navigate('.', { replace: true });
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
                                <img src={el.fileUrl} alt="" key={el.boardImageNo}/>
                            )
                        }
                    </div>
                </ContentDiv>
                <hr/>
                <ReviewDiv>
                    <Form onSubmit={handleSubmit}>
                        <Form.Control as="textarea" name='content' rows={3} onChange={handleReview}/>
                        <Button variant='secondary' type="submit" >작성</Button>
                    </Form>
                </ReviewDiv>
                <hr />
                <ReviewList data={vo?.reviews}/>
            </div>
            
        </StyledNoticeDetailDiv>
    );
};

export default BoardDetail;