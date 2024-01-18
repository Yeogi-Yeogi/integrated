import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberJoinDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: 70px;
    width: 100vw;

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


    & > div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    form > {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    //이 밑으로는 회원가입버튼디자인

    #joinbutton{
        color: #fff;
        background-color: #6C1895;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        border: none;
        width: 100px;
        height: 40px;
        border-radius: 10px;
        font-size: 16px;
    }

    & #table-container {
        width: 100%;
        text-align: center; // 테이블 내용 가운데 정렬
    }

    & td {
        text-align: center; // td 요소 내용 가운데 정렬
    }

    #joinbutton {
        margin-top: 10px; // 원하는 간격 조절
        width: 600px; // 원하는 넓이로 조절
    }
    
`;

const MemberJoin = () => {

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
    const [vo,setVo] = useState({
        name: "",
        id :"",
        pwd: "",
        nick: "",
        phone:"",
        email:"",
        resiNum:"",
    })
    const navigate = useNavigate();


    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    
   

    const handleChangeFile = () => {
        if (!imgRef.current.files.length) {
            // 파일 선택 취소했을때
            return;
        }
      
        const file = imgRef.current.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            setImgFile(fileReader.result);
        };
    };


    const handleInputChange = (event) => {
        const{name, value} = event.target;

        setVo({
            ...vo,
            [name] : value
        });
    }
    
    const handleMemberJoinSubmit = (event) => {
        event.preventDefault();

        if(isFetching){
            alert('회원가입이 이미 진행');
            return;
        }else{
            isFetching = true;
        }

        const formData = new FormData();

        //각 입력 필드의 값을 FormData에 추가
        formData.append('name',vo.name);
        formData.append('id', vo.id);
        formData.append('pwd', vo.pwd);
        formData.append('nick', vo.nick);
        formData.append('phone', vo.phone);
        formData.append('email', vo.email);
        formData.append('resiNum', vo.resiNum);
        formData.append('profileImg', vo.profileImg);


        fetch("http://127.0.0.1:8885/member/join", {
        method:"post",
        // headers:{
        //     "Content-Type":"application/json"
        // },
        body: formData //JSON.stringify(vo)
        })
        .then( resp => {
            if(!resp.ok){
                // throw new error("회원가입 fetch 실패...");
            }
            return resp.json();
        })
        .then( data => {
            if(data.msg === "good"){
                
                alert("회원가입 성공!");
                navigate("/");
            }else{
                alert("회원가입 실패..");
                navigate("/failpage");
            }
        })
        .catch((e) => {
            console.log(e);
            alert("회원가입 실패");
        })
        .finally( () => {
            isFetching = false;
        })
        ;

    }

    
    return (
        <StyledMemberJoinDiv>
            <form onSubmit={handleMemberJoinSubmit} encType="multipart/form-data">
                <table id="table-container">
                    <tr>
                        <td colSpan={3}>
                            <div>
                                <div>
                                    <img
                                        src= {imgFile ? imgFile : `/img/defaultClubImage.png`}
                                        alt="클럽 대표 이미지"
                                        id='previewImgTag'
                                        style={{width: "100%", height: "100%", borderRadius: "10px"}}
                                    />
                                </div>
                                <input type="file" name="f" id="fileInput" accept="image/*" onChange={handleChangeFile} ref={imgRef}/>
                                <label htmlFor="fileInput" >사진 선택</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td id="text">이름</td>
                        <td><input type="text" id='name' name="name" placeholder='이름을 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">아이디</td>
                        <td><input type="text" id='id' name="id" placeholder='3~15 영문/숫자 조합으로 입력' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="button" id='idbutton' name="idbutton" value="아이디 중복확인" onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">비밀번호</td>
                        <td><input type="text" id='name' name="pwd" placeholder='비밀번호를 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">비밀번호 확인</td>
                        <td><input type="text" id='name' name="pwdCheck" placeholder='비밀번호 입력하세요'/></td>
                    </tr>
                    <tr>
                        <td id="text">닉네임</td>
                        <td><input type="text" id='name' name="nick" placeholder='닉네임을 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">전화번호</td>
                        <td><input type="text" id='name' name="phone" placeholder='전화번호를 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">이메일</td>
                        <td><input type="text" id='name' name="email" placeholder='이메일을 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text"></td>
                        <td><input type="button" id='emailbutton' name="emailbutton" value="인증번호 전송" onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">인증번호</td>
                        <td><input type="text" id='email' name="email" placeholder='인증번호 확인' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">주민등록번호</td>
                        <td><input type="text" id='resiNum' name="resiNum" placeholder='주민등록번호를 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                    <td colspan="2"><input type="submit" id="joinbutton" value='회원가입'/></td>
                    </tr>
                </table>
            </form>                         
        </StyledMemberJoinDiv>
    );
};

export default MemberJoin;