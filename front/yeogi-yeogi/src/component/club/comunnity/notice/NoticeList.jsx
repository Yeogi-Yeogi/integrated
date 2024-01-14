import React, { useEffect, useState } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
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
    const [noticeList, setNoticeList] = useState();   //공지사항 리스트
    const [pageVo, setPageVo] = useState();
    const [items, setItems] = useState([]);
    const {clubNo} = useParams();
    const navigate = useNavigate();
    //페이지 번호 갱신 될때마다 데이터 불러오기

    // 페이지 번호 클릭 시 실행될 함수
    const handlePageClick = (pageNumber) => {
        setPageNo(pageNumber);
    };
    const getList = (pageNo) => {
        console.log(pageNo); //
        fetch(`http://localhost:8885/notice/list/${pageNo}?memberNo=1&clubNo=${clubNo}`)
        .then(res => {
            if(!res.ok) {
                throw new Error(res.data);
            }
            
            return res.json();
        })
        .then(data => {
            setNoticeList(data.list);
            setPageVo(data.pageVo);
        })
        .then(() => {
            console.log(pageVo);
            const newItem = []
            for (let number = pageVo?.startPage; number <= pageVo?.pageLimit; number++) {
                newItem.push(
                    <Pagination.Item key={number} active={number === pageNo}>
                    {number}
                    </Pagination.Item>
                );
            }
            setItems([...newItem]);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getList(pageNo);
    } , [pageNo]);


    /**
     * 공지사항 상세 조회 페이지로 이동
     * @param {*} no 게시글 번호
     */
    const handleClick = (no) => {
        navigate(`/club/${clubNo}/commu/board/notice/detail`, no)
    }

    const navigateWriteNotice = () => {
        navigate(`/club/${clubNo}/commu/board/notice/write`)
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
                <tr onClick={handleClick}>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>120</td>
                </tr>
                </tbody>
            </Table>
            <StyledWriteNoticeDiv>
                <Button onClick={navigateWriteNotice}>공지사항 작성하기</Button>
            </StyledWriteNoticeDiv>
            <div>
                <Pagination>
                    {items.map((item, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + pageVo.startPage === pageNo}
                            onClick={() => handlePageClick(index + pageVo.startPage)}
                        >
                            {index + pageVo.startPage}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </StyledTableDiv>

    );
};

export default NoticeList;