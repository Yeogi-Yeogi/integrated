import React, { useEffect, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
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


const NoticeList = () => {

    
    const [pageNo, setPageNo] = useState(1);    //현재 페이지
    const [noticeList, setNoticeList] = useState();   //공지사항 리스트
    const [pageVo, setPageVo] = useState();
    const [items, setItems] = useState([]);

    //페이지 번호 갱신 될때마다 데이터 불러오기

    // 페이지 번호 클릭 시 실행될 함수
    const handlePageClick = (pageNumber) => {
        setPageNo(pageNumber);
    };
    const getList = (pageNo) => {
        console.log(pageNo); //
        fetch(`http://localhost:8885/notice/list/${pageNo}?memberNo=1&clubNo=2`)
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

    const navigate = useNavigate();

    const handleClick = (no) => {
        navigate('/club/commu/board/notice/detail', no)
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