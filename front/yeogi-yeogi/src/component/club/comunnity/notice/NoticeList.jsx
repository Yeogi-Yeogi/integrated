import React, { useEffect, useState } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';


const StyledTableDiv = styled.div`
    width: 100%;
    margin-top: 3em;
    padding-left: 2em;
    

    & > table {
        border-collapse: collapse;

        & tbody > tr:hover {
            cursor: pointer;
        }

        & * {
            text-align: center;
        }

        & tr > *:first-child {
            width: 50%;
        }

        & tr > *:nth-child(2) {
            width: 15%;
        }

        & tr > *:nth-child(3) {
            width: 25%;
        }

        & tr > *:nth-child(4) {
            width: 10%;
        }
    }

    

    & ul  {
        
        margin: auto;
        margin-top: 2rem;
        margin-bottom: 2rem;
        display: flex;
        justify-content: center;

        & > * {
            border: none;
            margin-left: 0.5em;
        }
    }

    & span:first-child {
        border: #6c1895;
        background-color: #6c1895;
    }

    & a{
        color: black;
    }
`;
const StyledWriteNoticeDiv = styled.div`
    display: flex;
    justify-content: end;
    

    & > button {
        background-color: #6c1895;
        border-color: #6c1895;
        font-weight: 600;
        

        &:hover {
            background-color: #5d1582;
        }
    }

`;

const NoticeList = () => {

    
    const [pageNo, setPageNo] = useState(1);    //현재 페이지
    const [noticeList, setNoticeList] = useState([]);   //공지사항 리스트
    const [pageVo, setPageVo] = useState();
    const [items, setItems] = useState([]);
    const {clubNo} = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    //페이지 번호 갱신 될때마다 데이터 불러오기

    // 페이지 번호 클릭 시 실행될 함수
    const handlePageClick = (pageNumber) => {
        setPageNo(pageNumber);
    };
    const getList = (pageNo) => {
        console.log(pageNo); //
        const vo = JSON.parse(sessionStorage.getItem("loginMember"));
        if(vo) {
            const memberNo = vo.no;
            fetch(`http://localhost:8885/notice/list/${pageNo}?memberNo=${memberNo}&clubNo=${clubNo}`)
            .then(async res => {
                if(!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message);
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setNoticeList([...data.list]);
                setPageVo(data.pageVo);
                setIsAdmin(data.adminYn)
                console.log(pageVo);
                
                return data.pageVo;
            })
            .then((pageVo) => {
                const newItem = []
                for (let number = pageVo?.startPage; number <= pageVo?.maxPage; number++) {
                    newItem.push(
                        <Pagination.Item key={number} active={number === pageNo} onClick={() => handlePageClick(number)}>
                        {number}
                        </Pagination.Item>
                    );
                }
                setItems([...newItem]);
            })
            .catch(e => {
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
            })
        } else {
            alert('로그인한 회원만 이용가능합니다');
            navigate('/member/login');
        }
    }

    useEffect(() => {
        getList(pageNo);
    } , [pageNo]);


    /**
     * 공지사항 상세 조회 페이지로 이동
     * @param {*} no 게시글 번호
     */
    const handleClick = (no) => {
        navigate(`/club/${clubNo}/commu/board/notice/detail/${no}`);
    }

    const navigateWriteNotice = () => {
        navigate(`/club/${clubNo}/commu/board/notice/write`, {state: {isAdmin: isAdmin}});
    }



    return (
        //게시글 데이터 뿌리기 작업 필요.
        <StyledTableDiv>
            <Table >
                <thead>
                <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody>
                    {
                        noticeList.map(el => 
                            <tr onClick={() => {handleClick(el.noticeNo);}} key={el.noticeNo}>
                                <td>{el.title}</td>
                                <td>{el.memberName}</td>
                                <td>{el.enrollDate}</td>
                                <td>{el.hit}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <StyledWriteNoticeDiv>
                {
                    isAdmin &&
                    <Button onClick={navigateWriteNotice}>공지사항 작성하기</Button>
                }
            </StyledWriteNoticeDiv>
            <div>
                <Pagination>
                    {items.map((item) => 
                        item
                    )}
                </Pagination>
            </div>
        </StyledTableDiv>

    );
};

export default NoticeList;