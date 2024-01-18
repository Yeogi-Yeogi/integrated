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

    useEffect(() => {
        const observer = new IntersectionObserver(obsHandler, {threshold : 0.5});
        if(obsRef.current) observer.observe(obsRef.current);
        return () => {observer.disconnect(); }
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
        // console.log()

        try {
            const vo = JSON.parse(sessionStorage.getItem("loginMember"));
            const memberNo = vo.no;
            const res = await fetch(`http://localhost:8885/gallery/list/${page}?memberNo=${memberNo}&clubNo=${clubNo}`);
            const data = await res.json();

            if(data.length === 0) {
                endRef.current = false;
            }

            setList(prev => [...prev, ...data]);
            preventRef.current = true;
        } catch (e) {
            console.error(e);
        } finally {
            setLoad(false);
        }
    }, [page]);

    return (
        <>
            <StyledGalleryListDiv>
                {/* 이미지 클릭시 해당 게시글로 이동 */}
                {
                    list.map(el => 
                        <img key={el?.boardImageNo} src={el?.fileUrl} alt="" onClick={() => {navigate(`/club/${clubNo}/commu/board/detail/${el?.boardNo}`)}}/>
                    )
                }
            </StyledGalleryListDiv>
            {
                load &&
                <StyledSpinnerDiv>
                    <Spinner animation="border" />
                </StyledSpinnerDiv>
            }
            <StyledObserverDiv ref={obsRef}>옵저버 Element</StyledObserverDiv>
        </>
    );
};

export default GalleryList;