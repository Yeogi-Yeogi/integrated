import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import BoardListItem from './BoardListItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

const StyledBoardListDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;

    & > div:last-child {
        height: 10em;
    }
`;

const SpinnerContainerDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledButton = styled(Button)`
    position: fixed;
    bottom: 40px;
    right: 100px;
    background-color: #6c1895;
    border-color: #6c1895;
    font-weight: 600;
    width: 8em;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);

    &:hover {
        background-color: #5d1582;
    }

    &:active {
        background-color: #5d1582;
    }
`;

const BoardList = () => {
    const [page, setPage] = useState(-1); //페이징 번호
    const [load, setLoad] = useState(false); //==isFetching
    const [list, setList] = useState([]);
    const preventRef = useRef(true);
    const obsRef = useRef(null); //옵저버 element
    const endRef = useRef(false); //모든 게시글 리스트 가져왔는지
    const {clubNo} = useParams();
    const navigate = useNavigate();
    const vo = JSON.parse(sessionStorage.getItem("loginMember"));
    const memberNo = vo?.no;

    useEffect(() => {
        if(memberNo) {
            const observer = new IntersectionObserver(obsHandler, {threshold : 0.7});
            if(obsRef.current) observer.observe(obsRef.current);
            return () => {observer.disconnect(); }
        } else {
            alert('로그인한 회원만 이용가능합니다');
            navigate('/member/login');
        }
    }, []);

    const obsHandler = (entries) => {
        const target = entries[0];
        if(!endRef.current && target.isIntersecting && preventRef.current) {
            preventRef.current = false;
            setPage(prev => prev+1);
        }
    }

    useEffect(() => {
       if(page !== -1) getPost();
    }, [page]);

    const getPost = useCallback(async () => {
        setLoad(true); //로딩 시작 

        try {
            const res = await fetch(`http://localhost:8885/board/list/${page}?memberNo=${memberNo}&clubNo=${clubNo}`);
            
            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.message);
            }
            const data = await res.json();
            console.log(data);
            if(data.length === 0) { //마지막 페이지일 경우
                endRef.current = true;
            }

            setList(prev => [...prev, ...data]);
            preventRef.current = true;
        } catch (e) {
            const message = e.message;
            alert(message);
            switch(message) {
                case "회원 전용 서비스입니다. 로그인하세요.":
                    navigate('/member/login');
                    break;
                default:
                    navigate("/main");
                    break;
            }
        } finally {
            setLoad(false);
        }
    }, [page]);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <StyledBoardListDiv>
            {
                list.map(el => <BoardListItem data={el} key={el.boardNo}/>)
            }
            {
                load &&
                <SpinnerContainerDiv>
                    <Spinner animation="border" />
                </SpinnerContainerDiv>
            }
            <StyledButton onClick={handleScrollToTop}>위로 올라가기</StyledButton>
            <div ref={obsRef}></div>
        </StyledBoardListDiv>
    );
};

export default BoardList;