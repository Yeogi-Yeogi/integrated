import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledGalleryListDiv = styled.div`
    width: 30%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    place-items: center center;

    & > img {
        margin: 0.5em;
        width: 150px;
        height: 150px;
        border-radius: 10px;

        &:hover {
            cursor: pointer;
        }
    }
`;

const StyledSpinnerDiv = styled.div`
    width: 100%;
    display: flex;
    padding: 1em;
    justify-content: center;
    margin: auto;
`;

const StyledObserverDiv = styled.div`
    width: 100%;
    height: 10em;
`;

const GalleryList = () => {

    const navigate = useNavigate();
    const {clubNo} = useParams();
    const [list, setList] = useState([]); //서버에서 받아올 데이터 리스트
    const [page, setPage] = useState(-1); //페이징 번호
    const [load, setLoad] = useState(false); //현재 가져오고 있는 중인지?
    const preventRef = useRef(true);
    const obsRef = useRef(null);
    const endRef = useRef(false);
    const vo = JSON.parse(sessionStorage.getItem("loginMember"));
    const memberNo = vo?.no;
    useEffect(() => {
        if(memberNo) {
            const observer = new IntersectionObserver(obsHandler, {threshold : 0.5});
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

    const getPost = useCallback( async () => {
        setLoad(true);

        try {
            
            const res = await fetch(`http://localhost:8885/gallery/list/${page}?memberNo=${memberNo}&clubNo=${clubNo}`);
            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.message);
            }
            const data = await res.json();

            if(data.length === 0) {
                endRef.current = false;
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
                    navigate(`/main`);
                    break;
            }
        } finally {
            setLoad(false);
        }
    }, [page]);

    const loadBoardPage = (boardNo, notice) => {
        if(notice) {
            navigate(`/club/${clubNo}/commu/board/notice/detail/${boardNo}`)
        } else {
            navigate(`/club/${clubNo}/commu/board/detail/${boardNo}`)
        }
    }

    return (
        <>
            <StyledGalleryListDiv>
                {/* 이미지 클릭시 해당 게시글로 이동 */}
                {
                    list.map(el => 
                        <img key={el?.boardImageNo} src={el?.fileUrl} alt="" onClick={() => {loadBoardPage(el.boardNo, el.notice)}}/>
                    )
                }
            </StyledGalleryListDiv>
            {
                load &&
                <StyledSpinnerDiv>
                    <Spinner animation="border" />
                </StyledSpinnerDiv>
            }
            <StyledObserverDiv ref={obsRef}></StyledObserverDiv>
        </>
    );
};

export default GalleryList;