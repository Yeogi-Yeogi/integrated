import React from 'react';
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

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }

    //데이터 불러오기

    const navigate = useNavigate();

    const handleClick = (no) => {
        navigate('/club/commu/board/notice/detail', no)
    }

    return (
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
                <Pagination>{items}</Pagination>
            </div>
        </StyledTableDiv>

    );
};

export default NoticeList;