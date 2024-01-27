import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import MyPageSideBar from '../club/comunnity/board/common/MyPageSideBar';
import { useNavigate } from 'react-router-dom';

const StyledMemberEditDiv =styled.div`
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


    //이 밑으로는 수정하기버튼디자인

    #editbutton{
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

const MemberEdit = () => {

    //정보수정 중인지 여부를 나타내는 변수
    let isFetching = false;

    // 회원가입 정보를 담는 상태 변수
    const [vo,setVo] = useState({
        name: "",
        // id :"",
        pwd: "",
        nick: "",
        phone:"",
        email:"",
        // resiNum:"",
    })
    
    // React Router의 useNavigate 훅을 통해 네비게이션 기능 사용
    const navigate = useNavigate();
    
    // 프로필 이미지와 관련된 상태 및 ref 설정
    //현재 선택된 프로필 이미지의 데이터 URL을 저장하는 상태 변수,imgFile 상태를 업데이트하는 함수
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();

    const [memberVo,setMemberVo] = useState(JSON.parse(sessionStorage.getItem('loginMember')))


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
            profileImg : file ,//mutiPartfile에서 가져온 변수(키값) : 위에 지정한 변수(value)
        });
    };

    // 입력 필드 값 변경 시 동작하는 함수
    const handleInputChange = (event) => {
        const{name, value} = event.target;

        // 해당 입력 필드의 값을 업데이트
        setVo({
            ...vo,
            [name] : value
        });
    }

    // 정보수정 시 동작하는 함수
    const handleMemberMySelectSubmit = (event) => {
        event.preventDefault();

        if(isFetching){
            alert('회원정보수정이 이미 진행');
            return;
        }else{
            isFetching = true;
        }

        const formData = new FormData();

        //각 입력 필드의 값을 FormData에 추가// FormData를 사용하여 서버로 정보수정한것 전송
        formData.append('name',vo.name);
        // formData.append('id', vo.id);
        formData.append('pwd', vo.pwd);
        formData.append('nick', vo.nick);
        formData.append('phone', vo.phone);
        formData.append('email', vo.email);
        // formData.append('resiNum', vo.resiNum);
        formData.append('profileImg', vo.profileImg);


        fetch("http://127.0.0.1:8885/member/edit", {
        method:"post",
        // // headers:{
        // //     "Content-Type":"application/json"
        // // },
        body: formData //JSON.stringify(vo)
        })
        .then( resp => {
            if(!resp.ok){
                // throw new error("회원정보수정 fetch 실패...");
            }
            return resp.json();
        })
        .then( data => {
            if(data.msg === "good"){
                
                alert("회원정보수정 성공!");
                navigate("/member//myPageLayout/mySelect");
            }else{
                alert("회원정보수정 실패..");
                navigate("/failpage");
            }
        })
        .catch((e) => {
            console.log(e);
            alert("회원정보수정 실패");
        })
        .finally( () => {
            isFetching = false;
        })
        ;

    }



    return (
        <StyledMemberEditDiv>
            <div>
                <MyPageSideBar/>
                <form onSubmit={handleMemberMySelectSubmit} encType="multipart/form-data">
                    <table id="table-container">
                        <tr>
                            <td colSpan={3}>
                                <div>
                                    <div>
                                        <img
                                            src= {`http://127.0.0.1:8885/member/display?no=${memberVo.no}`? vo.fullPath : `/img/defaultClubImage.png`}//백틱
                                            alt="프로필 이미지"
                                            id='previewImgTag'
                                            style={{width: "50%", height: "50%", borderRadius: "10px"}}
                                        />
                                    </div>
                                    <label htmlFor="fileInput" >프로필 수정</label>
                                    <input type="file" name="f" id="fileInput" accept="image/*" onChange={handleChangeFile} ref={imgRef}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td id="text">이름</td>
                            <td><input type="text" id='name' name="name" placeholder={memberVo.name} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">아이디</td>
                            <td><input type="text" id="id" name="id" value={memberVo.id} readOnly/></td>
                        </tr>
                        <tr>
                            <td id="text">비밀번호</td>
                            <td><input type="text" id='pwd' name="pwd" placeholder={memberVo.pwd} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">닉네임</td>
                            <td><input type="text" id='nick' name="nick" placeholder={memberVo.nick} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">전화번호</td>
                            <td><input type="text" id='phone' name="phone" placeholder={memberVo.phone} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">이메일</td>
                            <td><input type="text" id='email' name="email" placeholder={memberVo.email} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">주민등록번호</td>
                            <td><input type="text" id="resiNum" name="resiNum" value={memberVo.resiNum} readOnly/></td>
                        </tr>
                        <tr>
                        <td colspan="2"><input type="submit" id="editbutton" value='수정하기'/></td>
                        </tr>
                    </table>
                </form>
            </div> 
        </StyledMemberEditDiv>
    );
};

export default MemberEdit;