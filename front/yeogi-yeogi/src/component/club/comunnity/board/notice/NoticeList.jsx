import React from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';


const StyledTableDiv = styled.div`
    width: 100%;
    margin: auto;

    & > table {
        border-collapse: collapse;

        & * {
            text-align: center;
        }
    }
`;
const NoticeList = () => {
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
                </tbody>
            </Table>
        </StyledTableDiv>
    );
};

export default NoticeList;