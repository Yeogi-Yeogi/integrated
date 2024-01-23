import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const StyledEditMemberDiv = styled.div`
    height: 500px;
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div:nth-child(1){
        display: flex;
        justify-content: flex-start;
        width: 100%;
        border-bottom: 4px solid #999999;
        & > h2 {
            margin-left: 100px;
            margin-bottom: 30px;
        }
    }
    & table:nth-of-type(1) {
        width: 800px;
        height: 100px;
        & > thead { 
            border-bottom: 1px solid #AFAFAF;
            & > tr > th {
                text-align: left;
            }
        }
        & > tbody {
            margin-top: 50px;
            max-height: 300px;
            overflow-y: auto;
            & > tr{

                & > td {
                    text-align: left;
                }
            }
        }

    }
    
    ::-webkit-scrollbar {
        width: 10px;  
    }

    ::-webkit-scrollbar-thumb {
        background: #6C1895;
        border-radius: 10px; 
    }

    ::-webkit-scrollbar-track {
        background: rgba(220, 20, 60, .1); 
    }

`;

const EditMember = () => {

    const navigate = useNavigate();
    const loginMember = sessionStorage.getItem("loginMember");
    
    // if(loginMember === null){
    //     navigate("/main");
    // }

    let { clubNo } = useParams();

    const [clubMemberList, setClubMemberList] = useState([]);

    const loadMemberList = () => {
        fetch("http://127.0.0.1:8885/club/clubMemberList/" + clubNo)
        .then(resp => resp.json())
        .then(clubMember => {
            console.log(JSON.stringify(clubMember, null, 2));
            setClubMemberList(clubMember);

            console.log(clubMemberList);
        })
    };

    useEffect(() => {
        loadMemberList();
    
    }, []); 


    // 마스터,어드민 여부 판단해서 나올 메뉴 정하기, 회원 리스트 반복
    const generateRows = () => {

        const rows = [];
        for (let i = 1; i <= 30; i++) {
          rows.push(
            <tr key={i}>
                <td>
                </td>
                <td>닉네임{i}</td>
                <td>심우너용</td>
                <td>010-1234-5678</td>
                <td>2001.01.01</td>
                <td>
                    <DropdownButton id="dropdown-basic-button" title="">
                        <Dropdown.Item onClick={zz}>관리자 지정</Dropdown.Item>
                        <Dropdown.Item onClick={zz}>관리자 해제</Dropdown.Item>
                        <Dropdown.Item onClick={zzz}>추방</Dropdown.Item>
                    </DropdownButton>
                </td>
            </tr>
          );
        }
        return rows;
    };

    const zz = () => {
        alert("zz");
    }
    const zzz = () => {
        alert("zzz");
    }
    return (
        <StyledEditMemberDiv>
            <div>
                <h2>회원 관리</h2>
            </div>
            <table>
                <colgroup>
                    <col width="30px"/>
                    <col width="170px"/>
                    <col width="170px"/>
                    <col width="200px"/>
                    <col width="200px"/>
                    <col width="30px"/>
                </colgroup>
                <thead>
                    <tr style={{fontSize: "18px"}}>
                        <th></th>
                        <th>닉네임</th>
                        <th>이름</th>
                        <th>전화번호</th>
                        <th>가입일자</th>
                    </tr>
                </thead>
            </table>
            <div style={{
                maxHeight : "300px",
                overflowY : "auto"
            }}>
                <table>
                    <colgroup>
                        <col width="30px"/>
                        <col width="170px"/>
                        <col width="170px"/>
                        <col width="200px"/>
                        <col width="200px"/>
                        <col width="30px"/>
                    </colgroup>
                    <tbody>
                        {
                            clubMemberList.map((member) => 
                                <tr key={member.memberNo}>
                                    <td>
                                        {member.memberNo === member.creatorNo && <img src="/img/goldCrown.png" alt="z" />}
                                        {member.adminYn === 'Y' && member.memberNo !== member.creatorNo && <img src="/img/silverCrown.png" alt="z" /> }
                                    </td>
                                    <td>{member.nick}</td>
                                    <td>{member.name}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.regDate}</td>
                                    <td>          
                                        {member.memberNo !== member.creatorNo &&                              
                                        <DropdownButton id="dropdown-basic-button" title="">
                                            {loginMember && member.creatorNo && loginMember.no === member.creatorNo && (
                                                <>
                                                    <Dropdown.Item onClick={zz}>관리자 지정</Dropdown.Item>
                                                    <Dropdown.Item onClick={zz}>관리자 해제</Dropdown.Item>
                                                </>
                                            )}
                                            
                                            <Dropdown.Item onClick={zzz}>회원추방</Dropdown.Item>                                       
                                        </DropdownButton>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                        {/* {generateRows()} */}
                    </tbody>
                </table>
            </div>
        </StyledEditMemberDiv>
    );
};

export default EditMember;