import React from 'react';
import { Pagination, Table } from 'react-bootstrap';
import styled from 'styled-components';


const StyledTableDiv = styled.div`
    width: 100%;
    margin-top: 3em;
    padding-left: 2em;

    & > table {
        border-collapse: collapse;

        & * {
            text-align: center;
        }

        & tr > *:first-child {
            width: 50%;
        }

        & tr > *:nth-child(2) {
            width: 20%;
        }

        & tr > *:nth-child(3) {
            width: 30%;
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

    return (
        <StyledTableDiv>
            <Table >
                <thead>
                <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr><tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
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