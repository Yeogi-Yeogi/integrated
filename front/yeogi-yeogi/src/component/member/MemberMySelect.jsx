import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyPageSideBar from '../club/comunnity/board/common/MyPageSideBar';


const StyledMemberMySelectDiv = styled.div`

    width: 100%;
    margin: auto;
    
    & > div {
        width: 70em;
        display: flex;
        justify-content:space-evenly;
        margin: auto;       
    }

    & input {
        border: 2px solid #999999;
        border-radius: 10px;
        width: 500px;
        height: 50px;
        margin: 10px;
        padding: 10px;
        outline: none;
        font-size: 0.8rem;        
    }

    & #table-container > & text{
        font-weight: bord;
        font-size: 100px;

        & input {
            border: 2px solid #999999;
            border-radius: 10px;
            width: 500px;
            height: 50px;
            margin: 10px;
            padding: 10px;
            outline: none;
            font-size: 0.8rem;        
        }
    }

    form > {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left:200px
    }

    
`;

const MemberMySelect = () => {

    // const [imgFile, setImgFile] = useState("");
    // const imgRef = useRef();

    // const handleChangeFile = () => {
    //     if(!imgRef.current.files.length) {
    //         setImgFile("");
    //         return;
    //     }

    //     const file = imgRef.current.file[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setImgFile(reader.result);
    //     };
    // };

    let isFetching = false;
    const [vo,setVo] = useState(JSON.parse(sessionStorage.getItem('loginMember')));

    // setVo((JSON.parse(sessionStorage.getItem('loginMember')))) //후순위
  
    return (
        <StyledMemberMySelectDiv>
            <div>
                <MyPageSideBar/>
                <form >
                    <table id="table-container">
                        <tr>
                            <td id="text">이름</td>
                            <td><input type="text" id="name" name="name" value={vo.name} readOnly/></td>
                        </tr>
                        <tr>
                            <td id="text">아이디</td>
                            <td><input type="text" id="name" name="name" value={vo.id} readOnly/></td>
                        </tr>
                        <tr>
                            <td id="text">비밀번호</td>
                            <td><input type="text" id="name" name="name" value={vo.pwd} readOnly/></td>
                        </tr>
                        <tr>
                            <td id="text">닉네임</td>
                            <td><input type="text" id="name" name="name" value={vo.nick} readOnly/></td>
                        </tr>
                        <tr>
                            <td id="text">전화번호</td>
                            <td><input type="text" id="name" name="name" value={vo.phone} readOnly/></td>
                        </tr>
                        <tr>
                            <td id="text">이메일</td>
                            <td><input type="text" id="name" name="name" value={vo.email} readOnly/></td>
                        </tr>
                        <tr>
                            <td id="text">주민등록번호</td>
                            <td><input type="text" id="name" name="name" value={vo.resiNum} readOnly/></td>
                        </tr>
                    </table>
                </form>
            </div>            
        </StyledMemberMySelectDiv>
    );
};

export default MemberMySelect;