import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ScheduleItem from './ScheduleItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

const StyledSchedulePastDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;
`;

const SpinnerContainerDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const SchedulePast = () => {

    ///데이터 받아오기
    const [page, setPage] = useState(-1); //페이징 번호
    const [load, setLoad] = useState(false); //==isFetching
    const [dto, setDto] = useState([]);
    const [isAdmin, setIsAdmin] = useState();
    const preventRef = useRef(true);
    const obsRef = useRef(null); //옵저버 element
    const endRef = useRef(false); //모든 게시글 리스트 가져왔는지
    const [isEnd, setIsEnd] =useState(endRef.current);
    const {clubNo} = useParams();
    const navigate = useNavigate();
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
 
     const getPost = useCallback(async () => {
         setLoad(true); //로딩 시작 
 
         try {
             const res = await fetch(`http://localhost:8885/schedule/list/${page}?memberNo=${memberNo}&clubNo=${clubNo}&isExpected=N`);
             if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.message);
            }
             const data = await res.json();
             console.log(data);
             if(data.length === 0) { //마지막 페이지일 경우
                 endRef.current = true;
                 setIsEnd(endRef.current);
             }
 
             setDto(prev => [...prev, ...data.list]);
             setIsAdmin(data.admin);
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

    
    return (
        <StyledSchedulePastDiv>
            {
                isAdmin &&
                <div style={{textAlign:'right' }}>
                    <Button>일정 등록하기</Button>
                </div>
            }
            {
                dto?.map(el => 
                    <ScheduleItem data={el} key={el.scheduleNo}/>
                )
            }
            {
                load &&
                <SpinnerContainerDiv>
                    <Spinner animation="border" />
                </SpinnerContainerDiv>
            }
            {
                isEnd  === false?
                <div ref={obsRef}></div>
                :
                <div>더 이상 게시글이 없습니다</div>

            }
        </StyledSchedulePastDiv>
    );
};

export default SchedulePast;