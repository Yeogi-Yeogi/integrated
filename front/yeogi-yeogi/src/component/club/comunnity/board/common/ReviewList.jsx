import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
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

            & > img {
                width: 60px;
                height: 60px;
                border-radius: 10px;
                margin-right: 0.5em;
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
const ReviewList = () => {
    const [reviews , setReviews] = useState();
    return (
        <StyledReviewListDiv>
            <div>
                <div>
                    <img src="https://i.namu.wiki/i/w11dbZZeomJI4bD3_KItw3vq7tgglcM1YQA_xHULxMsixPpY1S7KcB8WrEFhJNuSuejiiQkicGKMH12JvpUqBQ.webp" alt="" />
                    <span className='userSpan'>사용자</span>
                    <span className='dateSpan'>2024. 1. 12. 18:40</span>
                    <Button className='review-delete' variant="link">삭제</Button>
                </div>
                <div>
                    <span>뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글뎃글 뎃글 뎃글 뎃글 뎃글 뎃글</span>
                </div>
            </div>
            <div>
                <div>
                    <img src="https://i.namu.wiki/i/w11dbZZeomJI4bD3_KItw3vq7tgglcM1YQA_xHULxMsixPpY1S7KcB8WrEFhJNuSuejiiQkicGKMH12JvpUqBQ.webp" alt="" />
                    <span className='userSpan'>사용자</span>
                    <span className='dateSpan'>2024. 1. 12. 18:40</span>
                    <Button className='review-delete' variant="link">삭제</Button>
                </div>
                <div>
                    <span>뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글 뎃글뎃글 뎃글 뎃글 뎃글 뎃글 뎃글</span>
                </div>
            </div>
        </StyledReviewListDiv>
    );
};

export default ReviewList;