import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const StyledEditClubInfoDiv = styled.div`

    margin-bottom: 70px;

    & > form {
        height: 375px;
        width: 1000px;
        display: grid;
        grid-template-columns: 350px 650px;
    }

    & > form > div:nth-child(1){
        display: flex;
        flex-direction: column;
        align-items: center;
        & > [type="file"] {
            display: none;
        }
        & > div:nth-child(1){
            width: 250px;
            height: 250px;
            background-color: white;
            border: 2px solid #999999;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            margin-bottom: 30px;
            border-radius: 10px;
        }
        & > label {
            background-color: #6C1895;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
            color: #fff;
            width: 155px;
            padding: 10px 15px;
            border-radius: 10px;
            cursor: pointer;
            text-align: center;
        }
    }

    & > form > div:nth-child(2){
        display: grid;
        grid-template-rows: 1fr 3.5fr 1fr 1fr 1fr;
        width: 100%;
        height: 100%;
        padding: 10px;
        & > div:nth-child(1){
            display: grid;
            grid-template-columns: 4fr 0.8fr 0.8fr 0.8fr;
            align-items: center;
            justify-items: center;
        }
        
        &> div:nth-child(2) > textarea{
            width: 100%;
            height: 145px;
            margin-bottom: 15px;
            resize: none;
            padding: 20px 20px 20px 20px; 
            font-size: 0.8rem;
            border-radius: 5px;
            outline: none;
            border: 2px solid #999999;
        }
        & > div:nth-child(3){
            & > span {
                width: 70px;
                height: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
        }

        & > div:nth-child(4) {
            & > span {
                width: 70px;
                height: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
        }
        & > div:nth-child(5){
            display: flex;
            justify-content: flex-end;
            align-items: center;

            & > input {
                background-color: #6C1895;
                color: #fff;
                height: 70%;
                border: none;
                border-radius: 10px;
                box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
            }
            & > button {
                border: none;
                background-color: #6C1895;
                color: #fff;
                border-radius: 10px;
                height: 70%;
                margin-left: 15px;
                margin-right: 50px;
                box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
            }
        }
    }

    #deleteBtn{
        background-color: #DC0808;
        border: none;
        width: 95px;
        height: 35px;
        border-radius: 10px;
        color: #fff;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    }

    #signupLimit, #ageLimit{
        margin-left: 30px;
        border: 2px solid #999999;
        border-radius: 10px;
        outline: none;
        font-size: 0.8rem;
        width: 250px;
        height: 45px;
        text-align: center;
        -webkit-appearance:none; 
        background:url('/img/arrow-icon.png') no-repeat 97% 50%/20px auto;
        background-color: #fff;
    }
`;

const EditClubInfo = () => {

    const navigate = useNavigate();
    // 화면 정보 불러오기
    let { clubNo } = useParams();
    const [clubInfo, setClubInfo] = useState({});

    console.log(clubNo);
    const loadClubInfo = () => {
        fetch("http://127.0.0.1:8885/club/management/" + clubNo)
        .then(resp => resp.json())
        .then(clubInfo => {
            console.log(clubInfo);
            setClubInfo(clubInfo);
            console.log(clubInfo);
        })
    };

    useEffect(() => {
        loadClubInfo();
    }, []); 

    // 이미지 미리보기
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


    

    // 모임인원, 나이제한 글자 넣기,,,(임시)
    const signupLimit = [];
    for (let i = 5; i <= 20; i++) {
        signupLimit.push(<option key={i} value={i}>{i}</option>);
    }

    const ageLimit = [];
    for (let i = 5; i <= 30; i++) {
        ageLimit.push(<option key={i} value={i}>{i}세 이상</option>);
    }

    // 정보 변경 
    const handleChange = (e) => {      
        const {name, value} = e.target;

        // textarea 글자 바꿔줌
        if(e.target.name === "clubDescription"){
            setClubInfo({ 
                ...clubInfo, 
                clubDescription : e.target.value
            });
        } else {
            setClubInfo({
                ...clubInfo,
                [name] : value
            })
        }
        console.log(clubInfo);
    };

    // 변경완료 (제출)
    const handleSubmit = (input) => {
        alert("ㅋㅋㅋㅋㅎ");
        input.preventDefault();

        const formData = new FormData();
        formData.append("file", imgRef.current.files[0]);
        formData.append("clubNo", clubNo);
        formData.append("ageLimit", clubInfo.ageLimit);
        formData.append("signupLimit", clubInfo.signupLimit);
        formData.append("clubDescription", clubInfo.clubDescription);

        fetch("http://127.0.0.1:8885/club/editClub", {
            method : "POST",
            body : formData
        })
        .then(resp => resp.text())
        .then(data => {
            console.log(data);
            
        })
        .catch(error => {
            console.error("Error : ", error);
        });
    
    };

    const deleteClubConfirm = () => {
        Swal.fire({
            title: '정말 삭제 하시겠습니까?',
            text: '클럽을 삭제하시면 다시 되돌릴 수 없습니다.',
            icon: 'question',
            
            showCancelButton: true,
            confirmButtonColor: '#3085d6', 
            cancelButtonColor: '#d33', 
            confirmButtonText: '확인',
            cancelButtonText: '취소', 
         }).then(result => {
            if (result.isConfirmed) { 
                deleteClub();
            }
         });
    };
    
    const deleteClub = () => {
        alert("클럽삭ㅈ젷ㅎㅎㅎㅎ");
        fetch("http://127.0.0.1:8885/club/deleteClub", {
            method : "POST",
            body : clubNo 
        })
        .then(resp => resp.text())
        .then(data => {
            console.log(data);
            if(data === 1){
                navigate(`/main`);
            }
        })
        .catch(error => {
            console.error("Error : ", error);
        });
    };
    
    return (
        <StyledEditClubInfoDiv>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <img
                            src={imgFile ? imgFile : clubInfo.fileUrl}
                            alt="클럽 대표 이미지"
                            id='previewImgTag'
                            style={{width: "100%", height: "100%", borderRadius:"10px"}}
                        />
                    </div>
                    <input type="file" name="f" id="fileInput" accept="image/*" onChange={handleChangeFile} ref={imgRef}/>
                    <label htmlFor="fileInput">대표이미지 변경</label>
                </div>


                <div>  
                    <div>
                        <h2 style={{color:"#3A3A3A"}}>{clubInfo.name}</h2>
                        <span style={{color:"#3A3A3A"}}>모임장 {clubInfo.nick}</span>
                        <span style={{color:"#999999"}}>회원수 {clubInfo.memberCount}</span>
                        <button type='button' id='deleteBtn' onClick={deleteClubConfirm}>모임삭제</button>
                    </div>
                    <div>
                        <textarea name="clubDescription" id="" cols="30" rows="10" value={clubInfo.clubDescription} onChange={handleChange} spellCheck="false">
                           
                        </textarea>
                    </div>
                    <div>
                        <span>모임 인원</span>
                        <select name="signupLimit" id="signupLimit" onChange={handleChange}>
                            <option value="" disabled selected>현재 인원제한 {clubInfo.signupLimit}</option>
                            {signupLimit}
                        </select>
                    </div>
                    <div>
                        <span>나이 제한</span>
                        <select name="ageLimit" id="ageLimit" onChange={handleChange}>
                            <option value="" disabled selected>현재 나이제한 {clubInfo.ageLimit}</option>
                            {ageLimit}
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="변경완료"/>
                        <button type='button' onClick={() => { navigate(`/club/${clubNo}/commu/board/list`);}}>취소</button>
                    </div>
                </div>  
            </form>
        </StyledEditClubInfoDiv>
    );
};

export default EditClubInfo;