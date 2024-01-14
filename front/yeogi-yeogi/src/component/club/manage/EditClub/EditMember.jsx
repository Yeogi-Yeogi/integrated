import React from 'react';
import styled from 'styled-components';

const StyledEditMemberDiv = styled.div`
    background-color: beige; //임시
    height: 500px;
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & table {
        width: 800px;
        height: 300px;
        & > thead { 
            border-bottom: 1px solid black;
            & > tr > th {
                text-align: center;
            }
        }
        & > tbody > tr > td {
            text-align: center;
        }
    }
`;

const EditMember = () => {
    return (
        <StyledEditMemberDiv>
            <h2>회원 관리</h2>
            <table>
                <thead>
                    <tr>
                        <th>닉네임</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>가입일자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </StyledEditMemberDiv>
    );
};

export default EditMember;