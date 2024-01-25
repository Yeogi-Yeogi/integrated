import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    const loginMember = JSON.parse(sessionStorage.getItem("loginMember"));
    
    // if(loginMember === null){
    //     navigate("/main");
    //     return;
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


    // 짭 더미데이터
    // const generateRows = () => {

    //     const rows = [];
    //     for (let i = 1; i <= 30; i++) {
    //       rows.push(
    //         <tr key={i}>
    //             <td>
    //             </td>
    //             <td>닉네임{i}</td>
    //             <td>심우너용</td>
    //             <td>010-1234-5678</td>
    //             <td>2001.01.01</td>
    //             <td>
    //                 <DropdownButton id="dropdown-basic-button" title="">
    //                     <Dropdown.Item onClick={zz}>관리자 지정</Dropdown.Item>
    //                     <Dropdown.Item onClick={zz}>관리자 해제</Dropdown.Item>
    //                     <Dropdown.Item onClick={zzz}>추방</Dropdown.Item>
    //                 </DropdownButton>
    //             </td>
    //         </tr>
    //       );
    //     }
    //     return rows;
    // };
    const [checkAdmin, setCheckAdmin] = useState({});
    const checkMemberDto = {
        "memberNo" : loginMember.no,
        "clubNo" : clubNo,
    };

    useEffect(()=>{
        fetch("http://127.0.0.1:8885/club/checkMember", {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkMemberDto)
        })
        .then(resp => resp.json())
        .then(check => {
            setCheckAdmin(check);
        })   
    },[]);

    const editClubMemberConfirm = (editType, member) => {
        let editText = '';

        switch (editType) {
          case 'adminY':
            editText = '관리자로 지정';
            break;
          case 'adminN':
            editText = '관리자 해제';
            break;
          case 'deleteMember':
            editText = '회원 추방';
            break;
        }

        Swal.fire({
            text: member.nick + '님을 ' + editText + ' 하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6', 
            cancelButtonColor: '#d33', 
            confirmButtonText: '확인',
            cancelButtonText: '취소', 
         }).then(result => {
            if (result.isConfirmed) { 
                editMember(editType, member);
            }
         });
    };

    const editMember = (editType, member) => {
        const editClubMemberDto = {
            "no" : clubNo,
            "memberNo" : member.memberNo,
            "editType" : editType,
        };

        fetch("http://127.0.0.1:8885/club/editClubMember", {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editClubMemberDto)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("data ::: ", data);
            // if(data === '1'){
                loadMemberList();
            // }
        })   
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
                            clubMemberList.map((member) => {                     
                                return <tr key={member.memberNo} style={{height:"40px"}}>
                                    <td >
                                        {member.memberNo === member.creatorNo && <img src="/img/goldCrown.png" alt="z" />}
                                        {member.adminYn === 'Y' && member.memberNo !== member.creatorNo && <img src="/img/silverCrown.png" alt="z" /> }
                                    </td>
                                    <td>{member.nick}</td>
                                    <td>{member.name}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.regDate}</td>
                                    <td>          
                                        {member.creatorNo === null && loginMember.no !== member.memberNo && !(checkAdmin.creatorYn === 'N' && member.adminYn === 'Y') &&                 
                                            <DropdownButton>
                                                {(checkAdmin.creatorYn === 'Y' && member.adminYn === 'N') &&
                                                    <Dropdown.Item onClick={() => editClubMemberConfirm('adminY', member)}>관리자 지정</Dropdown.Item>
                                                }
                                                {(checkAdmin.creatorYn === 'Y' && member.adminYn === 'Y') &&
                                                    <Dropdown.Item onClick={() => editClubMemberConfirm('adminN', member)}>관리자 해제</Dropdown.Item>
                                                }            
                                                <Dropdown.Item onClick={() => editClubMemberConfirm('deleteMember', member)}>회원추방</Dropdown.Item>   
                                            </DropdownButton>
                                        }
                                    </td>
                                </tr>
                            }
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