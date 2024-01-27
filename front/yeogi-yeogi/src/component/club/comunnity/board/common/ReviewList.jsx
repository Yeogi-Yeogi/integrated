import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const StyledReviewListDiv = styled.div`
    width: 100%;

    & * {
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    & > div {
        width: 95%;
        height: 10em;
        padding: 1em;
        margin: auto;
        margin-left: 1em;
        

        & > div:first-child {
            margin-top: 2em;
            display: flex;
            margin: auto;
            align-items: end;
            margin-bottom: 0.5em;

            & > img:first-child {
                width: 60px;
                height: 60px;
                border-radius: 10px;
                margin-right: 0.5em;
            }

            & > img:nth-child(2) {
                width: 15px;
                height: 15px;
                margin-bottom: 0.5em;
            }

            & > span.userSpan {
                font-size: 1.1em;
                font-weight: 600;
                margin-right: 0.5em;
            }

            & > span.dateSpan {
                color: #999999;
                font-weight: 100;
                margin-right: 0.5em;
            }

            & > button.review-delete {
                color: #3a3a3a;
                padding: 0%;
                text-decoration: none;
                font-size: 0.8em;
                font-weight: 600;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            }

        }

        & > div:nth-child(2) {
            margin: auto;
            padding-bottom: 0.5em;
            border-bottom: 1px solid #999999;
            & > span {
                font-size: 1em;
            }
        }
    }
`;
const ReviewList = ({data, setPageNo}) => {

    const {clubNo, boardNo} = useParams();
    const [isFetching, setIsFetching] = useState(false);
    
    /**
     * 리뷰 삭제 기능
     * @param {*} reviewNo 리뷰번호
     * @param {*} setPageNo 화면 리렌더링을 위한 함수
     */
    const handleDeleteReview = (reviewNo, setPageNo) => {
        if(isFetching) {
            alert('삭제중입니다.')
        }
        

        setIsFetching(true);
        const vo = JSON.parse(sessionStorage.getItem("loginMember"));
        const memberNo = vo.no;
        const data = {
            reviewNo: reviewNo,
            clubNo: clubNo,
            writerNo: memberNo,
            boardNo: boardNo
        }

        fetch(`http://localhost:8885/review/delete`, {
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
            setPageNo(new Number(0));
        })
        .catch(err => {
            alert(err);
        })
        .finally(() => {
            setIsFetching(false);
        })
    }

    return (
        <StyledReviewListDiv>
            { 
                data?.map(el => 
                    <div key={el.reviewNo}>
                        <div>
                            <img src={el.memberProfile} alt="" />
                            <span className='userSpan'>{el.memberNick}</span>
                            {
                                el.creatorYn ?
                                <img src="https://junho-practice.s3.ap-northeast-2.amazonaws.com/creator.png" alt="" width="15" height="15"/>
                                :
                                !el.creatorYn && el.adminYn ?
                                <img src="https://junho-practice.s3.ap-northeast-2.amazonaws.com/admin.png" alt="" width="15" height="15"/>
                                :
                                null
                            }
                            <span className='dateSpan'>{el.enrollDate}</span>
                            <Button className='review-delete' variant="link" onClick={() => {handleDeleteReview(el.reviewNo, setPageNo)}}>삭제</Button>
                        </div>
                        <div>
                            <span>{el.content}</span>
                        </div>
                    </div>
                )
            }
        </StyledReviewListDiv>
    );
};

export default ReviewList;