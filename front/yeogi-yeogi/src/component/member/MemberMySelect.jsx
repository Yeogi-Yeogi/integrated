import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberMySelectDiv = styled.div`
    
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
    
    const handleMemberMySelectSubmit = (event) => {
        event.preventDefault();

        if(isFetching){
            alert('내 정보 조회 이미 진행');
            return;
        }else{
            isFetching = true;
        }

        // formData.append('profileImg', vo.profileImg);

        // fetch("http://127.0.0.1:8885/member/mySelect", {
        // method:"post",
        // // headers:{
        // //     "Content-Type":"application/json"
        // // },
        // body: vo //JSON.stringify(vo)
        // })
        // .then( resp => {
        //     if(!resp.ok){
        //         // throw new error("내 정보 조회 fetch 실패...");
        //     }
        //     return resp.json();
        // })
        // .then( data => {
        //     if(data.msg === "good"){
                
        //         alert("내 정보 조회 성공!");
        //         navigate("/");
        //     }else{
        //         alert("내 정보 조회 실패..");
        //         navigate("/failpage");
        //     }
        // })
        // .catch((e) => {
        //     console.log(e);
        //     alert("내 정보 조회 실패");
        // })
        // .finally( () => {
        //     isFetching = false;
        // })
        // ;

    }

    
    return (
        <StyledMemberMySelectDiv>
            {/* <form onSubmit={handleMemberMySelectSubmit} encType="multipart/form-data"> */}
                <table id="table-container">
                    <tr>
                        <td id="text">이름</td>
                        <td>{vo.name}</td>
                    </tr>
                    <tr>
                        <td id="text">아이디</td>
                        <td>{vo.id}</td>
                    </tr>
                    <tr>
                        <td id="text">비밀번호</td>
                        <td>{vo.pwd}</td>
                    </tr>
                    <tr>
                        <td id="text">닉네임</td>
                        <td>{vo.nick}</td>
                    </tr>
                    <tr>
                        <td id="text">전화번호</td>
                        <td>{vo.phone}</td>
                    </tr>
                    <tr>
                        <td id="text">이메일</td>
                        <td>{vo.email}</td>
                    </tr>
                    <tr>
                        <td id="text">주민등록번호</td>
                        <td>{vo.resiNum}</td>
                    </tr>
                </table>
            {/* </form>                          */}
        </StyledMemberMySelectDiv>
    );
};

export default MemberMySelect;