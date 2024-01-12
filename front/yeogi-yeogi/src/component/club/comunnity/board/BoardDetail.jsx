import React from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';


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

     & > form  {
        display: flex;
        justify-content: space-between;

        & button {
            width: 50%;
        }
        
        & textarea {
            resize: none;
            width: 30em;
        }
     }
     
     
     
`;

const BoardDetail = (props) => {
    return (
        <StyledNoticeDetailDiv>
            <div>
                <div>
                    <div>
                        <img src={props.src} alt="" />
                        <span>사용자</span>
                        <span>2024. 12. 24. 22:54</span>
                    </div>
                    <div>
                        <Button variant="link">수정</Button>
                        <Button variant="link">삭제</Button>
                    </div>
                </div>
                <hr/>
                <ContentDiv>
                    <h4>제목 제목 제목 제목 제목 </h4>
                    <p>내용용 내용용 내용용 내용용 내용용 </p>
                    <div>
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                        <img src={props.src} alt="" />
                    </div>
                </ContentDiv>
                <hr/>
                <ReviewDiv>
                    <Form>
                        <Form.Control as="textarea" name='content' rows={3}/>
                        <Button variant='secondary' type="submit" >작성하기</Button>
                    </Form>
                </ReviewDiv>
            </div>

        </StyledNoticeDetailDiv>
    );
};

export default BoardDetail;