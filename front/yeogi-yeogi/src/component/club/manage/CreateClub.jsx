import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const StyledCreateClubdiv = styled.div`
    &{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 70px;
        margin-bottom: 70px;
    }
    & input, & select {
        border: 2px solid #999999;
        border-radius: 10px;
        width: 250px;
        height: 50px;
        margin: 10px;
        padding: 10px;
        outline: none;
        font-size: 0.8rem;
        
    }

    & select {
        text-align: center;
        -webkit-appearance:none; 
        background:url('/img/arrow-icon.png') no-repeat 97% 50%/20px auto;
        background-color: #fff;
    }

    & > div:nth-of-type(1){
        width: 600px;
        height: 900px;
        background-color: #f9f9f9;
        & > form {
            margin-top: 50px;
            display: grid;
            grid-template-rows : auto;
            align-items: center;
            justify-content: center;
            justify-items: center;
            & > div:nth-of-type(1){
                width: 250px;
                height: 250px;
                border: 2px solid #999999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                margin-bottom: 25px;
                & > div:nth-of-type(1){
                    width: 150px;
                    height: 150px;
                    margin-bottom: 15px;
                    border-radius: 10px;
                    border: 1px solid #e8e8e8;
                    
                }
            }
            & > div:nth-of-type(2) > button{
                color: #fff;
                background-color: #6C1895;
                box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
                border: none;
                width: 100px;
                height: 40px;
                border-radius: 10px;
                font-size: 16px;
            }
        }
        & > form input[type="file"] {
            display: none;
        }
        & > form > div:nth-of-type(1) > label {
            background-color: #6C1895;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
            color: #fff;
            width: 120px;
            padding: 10px 15px;
            border-radius: 10px;
            cursor: pointer;
            text-align: center;
        }
        
        & > form input[type="submit"] {
            width: 400px;
            height: 70px;
            border-radius: 25px;
            border: none;
            background-color: #6C1895;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
            color: #fff;
            font-weight: bold;
            font-size: 18px;
            
        }

        & > form textarea[id='clubDescription']{
            width: 350px;
            height: 135px;
            margin-bottom: 15px;
            resize: none;
            padding: 20px 20px 20px 20px; 
            font-size: 0.8rem;
            border-radius: 5px;
            outline: none;
            border: 2px solid #999999;
        }

        .selelctBoxdiv{
            display: flex;
            flex-direction: row;
            align-items: center;
            & > div{
                width: 70px;
                height: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
        }
    }
`;

const CreateClub = () => {
    
    const loginMember = window.sessionStorage.getItem("loginMember");

    const vo = JSON.parse(loginMember);
    const creatorNo = vo?.no;

    console.log("loginMember ::: ", loginMember);
    console.log("vo ::: ", vo);
    
    const navigate = useNavigate();

    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const [clubNameCheck, setClubNameCheck] = useState(false);
    const [createClubDto, setCreateClubDto] = useState({
        "creatorNo" : creatorNo
    });

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

    const handleChangeInput = (input) => {
        const {name, value} = input.target;
        if(name === "name"){
            setClubNameCheck(false);
        }
        
        setCreateClubDto({
            ...createClubDto,
            [name] : value
        });
    };

    

    const handleSubmit = (input) => {
        input.preventDefault();
        console.log(createClubDto);
        
        if(!createClubDto.categoryNo){
            Swal.fire({
                icon: 'warning',                  
                text: '카테고리를 선택해주세요', 
                confirmButtonText: '확인'
            });
            return;
        }

        if(!clubNameCheck){
            Swal.fire({
                icon: 'warning',                  
                text: '모임명 중복확인을 진행하셔야합니다.', 
                confirmButtonText: '확인'
            });
            return;
        }
        // 빈값에 대한거 작성..

        const formData = new FormData();

        formData.append("file", imgRef.current.files[0]);
        formData.append("name", createClubDto.name);
        formData.append("categoryNo", createClubDto.categoryNo);
        formData.append("creatorNo", createClubDto.creatorNo);
        formData.append("ageLimit", createClubDto.ageLimit);
        formData.append("signupLimit", createClubDto.signupLimit);
        formData.append("clubDescription", createClubDto.clubDescription);

        console.log(formData);

        fetch("http://127.0.0.1:8885/club/createClub", {
            method : "POST",
            body : formData
        })
        .then(resp => resp.text())
        .then(data => {
            console.log("ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ :",data);
            if(data !== "0"){
                Swal.fire({
                    icon: 'success',                  
                    text: '모임 생성 완료!', 
                    confirmButtonText: '확인'
                  });
                navigate("/club/"+ data +"/commu/board");
                // 클럽 주소
            }
            // 실패시에는..?
        })
        .catch(error => {
            console.error("Error : ", error);
        });
    
    };

    // 이름 중복 확인
    const handleNameCheck = (e) => {
        e.preventDefault();
        const name = document.querySelector('#name');
 
        if(name.value === ""){
            Swal.fire({
                icon: 'error',                  
                text: '모임 이름을 입력해주세요', 
                confirmButtonText: '확인'
              });
            return;
        }

        fetch("http://127.0.0.1:8885/club/checkClubName",{
            method: "POST",
            body: createClubDto.name,
        })
        .then( (resp) => resp.text())
        .then(data => {
            console.log(data);
            if(data === "success"){
                Swal.fire({
                    icon: 'success',                  
                    text: '사용할 수 있는 모임 이름입니다.', 
                    confirmButtonText: '확인'
                });
                setClubNameCheck(true);
                return;
            }
            Swal.fire({
                icon: 'warning',                  
                text: '현재 사용중인 모임 이름입니다.', 
                confirmButtonText: '확인'
            });
            name.value = "";
        })
    };
    const [clubCategory, setClubCategory] = useState();
    useEffect(() => {
            fetch("http://127.0.0.1:8885/club/getCategoryName")
            .then(resp => resp.json())
            .then(categoryList => {
                console.log("categoryList", categoryList);

                const options = categoryList.map(category => (
                  <option key={category.categoryNo} value={category.categoryNo}>
                    {category.categoryName}
                  </option>
                ))
                setClubCategory(options);
            })       

    },[]);

    const signupLimit = [];
    for (let i = 5; i <= 20; i++) {
        signupLimit.push(<option key={i} value={i}>{i}</option>);
    }

    const ageLimit = [];
    for (let i = 1; i <= 100; i++) {
        ageLimit.push(<option key={i} value={i}>{i}</option>);
    }
    return (
        <StyledCreateClubdiv>
            <div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <div>
                        <input type="text" name="name" id="name" placeholder='모임 이름을 설정해주세요' onChange={handleChangeInput}/> <button onClick={handleNameCheck}>중복 확인</button>
                    </div>
                    <div className='selelctBoxdiv'>
                        <div>카테고리</div>
                        <select name="categoryNo" id="category" onChange={handleChangeInput}>
                            <option value="" disabled selected>카테고리 선택</option>
                            {/* <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option> */}
                             {clubCategory}
                        </select>
                    </div>
                    <div className='selelctBoxdiv'>
                        <div>모임 인원</div>
                        <select name="signupLimit" id="signupLimit" onChange={handleChangeInput}>
                            <option value="" disabled selected>모임인원 선택</option>
                            {signupLimit}
                        </select>
                    </div>
                    <div className='selelctBoxdiv'>
                        <div>나이 제한</div>
                        <select name="ageLimit" id="ageLimit" onChange={handleChangeInput}>
                            <option value="" disabled selected>나이제한 선택</option>
                            {ageLimit}
                        </select>
                    </div>
                    <textarea name="clubDescription" id="clubDescription" placeholder='모임 소개를 입력해주세요'  onChange={handleChangeInput} spellCheck={false}/>

                    <input type="submit" value="모임 만들기"/>
                </form>
            </div>
        </StyledCreateClubdiv>
    );
};

export default CreateClub;