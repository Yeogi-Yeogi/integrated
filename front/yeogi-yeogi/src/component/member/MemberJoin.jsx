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

    & > div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
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
        font-weight: bold;
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

    & .imgBox {
        display: flex;
        justify-content: center;
        height: 300px;
        overflow: hidden;
        & img {
            display: block;
            height: 100%;
        }
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

    // 회원가입 중인지 여부를 나타내는 변수
    let isFetching = false;

    // 회원가입 정보를 담는 상태 변수
    const [vo,setVo] = useState({
        name: "",
        id :"",
        pwd: "",
        nick: "",
        phone:"",
        email:"",
        resiNum:"",
    })

    // React Router의 useNavigate 훅을 통해 네비게이션 기능 사용
    const navigate = useNavigate();

    // 프로필 이미지와 관련된 상태 및 ref 설정
    //현재 선택된 프로필 이미지의 데이터 URL을 저장하는 상태 변수,imgFile 상태를 업데이트하는 함수
    const [imgFile, setImgFile] = useState("");
    //파일 입력(input type="file") 엘리먼트에 대한 참조를 생성->해당 엘리먼트에 접근가능
    const imgRef = useRef();

    // console.log(imgRef?.current)
    // console.log(imgRef?.current?.files)
    // console.log(imgRef?.current?.name)
    // console.log(imgRef?.current?.value)
    // console.log(imgRef?.current?.accept)

    
    // 프로필 이미지 파일 변경 시 동작하는 함수
    const handleChangeFile = () => {
        //파일 입력 엘리먼트에서 선택된 파일의 개수
        if (!imgRef.current.files.length) {
            // 파일 선택 취소했을때
            return;
        }
      
        const file = imgRef.current.files[0];//선택된 파일이 있다면, 첫 번째 파일을 가져와서 FileReader를 사용하여 해당 파일의 내용을 읽습니다
        
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);// 파일의 내용을 데이터 URL로 읽어오도록 지시
        
        // 파일 읽기가 완료된 후에 실행되는 콜백 함수
        //파일의 데이터 URL을 setImgFile을 통해 imgFile 상태에 업데이트
        fileReader.onloadend = () => {
            setImgFile(fileReader.result);//이미지 썸네일 보여주기용
        };

        // 회원가입 정보 중 프로필 이미지 업데이트
        setVo({
            ...vo , 
            'profileImg' : file , //mutiPartfile에서 가져온 변수(키값) : 위에 지정한 변수(value)
        });
    };

    // 입력 필드 값 변경 시 동작하는 함수
    const handleInputChange = (event) => {
        const{name, value} = event.target;

        // const name = event.target.name
        // const value =event.target.value
        //name은 input태그에 있는 값

        // 해당 입력 필드의 값을 업데이트
        setVo({
            ...vo,
            [name] : value
        });
    }

    //아이디 중복 체크시 동작하는 함수 
    const idCheck = (event) => {
        // 서버로 전송할 데이터 준비
        const inputData = {
            id: document.getElementById('id').value, // 혹은 리액트 상태에서 가져오기
        };
        console.log("inputData:",inputData); // ok

        // 서버로 POST 요청을 보냄
        fetch('http://127.0.0.1:8885/member/idCheck', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        })
        .then(response => {
            if (!response.ok) {
              throw new Error(`서버 응답 오류: ${response.status} ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            if (data.msg === 'good') {
              console.log('아이디 중복 확인: 가능');
              alert('아이디 중복 확인: 가능');
            } else {
              console.log('아이디 중복 확인: 중복');
              alert('아이디 중복 확인: 중복');
            }
          })
          .catch(error => {
            console.error('아이디 중복 확인 에러:', error);
          }); 
    };
    
    // 회원가입 양식 제출 시 동작하는 함수
    const handleMemberJoinSubmit = (event) => {
        event.preventDefault();

        const pwd = event.target.pwd.value;
        const pwdCheck = event.target.pwdCheck.value;
        if(pwd !== pwdCheck){
            alert("비밀번호 불일치. 다시 확인하세요");
            return;
        }

        if(isFetching){
            alert('회원가입이 이미 진행');
            return;
        }else{
            isFetching = true;
        }

        const formData = new FormData();

        //각 입력 필드의 값을 FormData에 추가// FormData를 사용하여 서버로 회원가입 정보 전송
        formData.append('name',vo.name);
        formData.append('id', vo.id);
        formData.append('pwd', vo.pwd);
        formData.append('nick', vo.nick);
        formData.append('phone', vo.phone);
        formData.append('email', vo.email);
        formData.append('resiNum', vo.resiNum);
        formData.append('profileImg', vo.profileImg);

        console.log('email:', vo.email);
        // 서버에 회원가입 요청을 보내고 응답 처리
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
                navigate("/member/login");
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

    // JSX를 반환하여 화면에 표시
    return (
        <StyledMemberJoinDiv>
            <form onSubmit={handleMemberJoinSubmit} encType="multipart/form-data">
                <table id="table-container">
                    <tr>
                        <td colSpan={3}>
                            <div>
                                <div className='imgBox'>
                                    <img
                                        src= {imgFile ? imgFile : `/img/defaultClubImage.png`}
                                        alt="프로필 이미지"
                                        id='previewImgTag'
                                    />
                                </div>
                                <label htmlFor="fileInput" >프로필 선택</label>
                                <input type="file" name="f" id="fileInput" accept="image/*" onChange={handleChangeFile} ref={imgRef}/>
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
                        <td><input type="button" id='idCheck' name="idCheck" value="아이디 중복확인" onClick={idCheck}/></td>
                    </tr>
                    <tr>
                        <td id="text">비밀번호</td>
                        <td><input type="text" id='pwd' name="pwd" placeholder='비밀번호를 입력하세요'  onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">비밀번호 확인</td>
                        <td><input type="text" id='pwdCheck' name="pwdCheck" placeholder='비밀번호 입력하세요'/></td>
                    </tr>
                    <tr>
                        <td id="text">닉네임</td>
                        <td><input type="text" id='nick' name="nick" placeholder='닉네임을 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">전화번호</td>
                        <td><input type="text" id='phone' name="phone" placeholder='전화번호를 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">이메일</td>
                        <td><input type="text" id='email' name="email" placeholder='이메일을 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text"></td>
                        <td><input type="button" id='emailbutton' name="emailbutton" value="인증번호 전송" onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td id="text">인증번호</td>
                        <td><input type="text" id='emailNum' name="emailNum" placeholder='인증번호 확인' onClick={handleInputChange}/></td>
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

// MemberJoin 컴포넌트를 외부로 내보냄
export default MemberJoin;