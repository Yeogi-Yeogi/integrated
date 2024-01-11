import React, { useRef, useState } from 'react';
import styled from 'styled-components';

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
                    border: 1px solid black;
                    
                }
            }
            & > div:nth-of-type(2) > button{
                color: #fff;
                background-color: #6C1895;
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

    const [imgFile, setImgFile] = useState();
    const imgRef = useRef();

    const saveImgFile = () => {
        const file = imgRef.current.files[0]; // 첫 번째 파일만 사용
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImgFile(reader.result);
            };
        }
    };

    const handleSubmit = () => {

    };

    const handleChangeFile = (e) => {
        setImgFile(e.target.files[0]);
        console.log(imgFile);
        saveImgFile();
    }

    return (
        <StyledCreateClubdiv>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <img
                                src={imgFile}
                                alt="클럽 대표 이미지"
                                style={{width: "100px", height: "100px"}}
                            />
                        </div>
                        <input type="file" name="f" id="fileInput" accept="image/*" onChange={handleChangeFile} />
                        <label htmlFor="fileInput" >사진 선택</label>
                    </div>
                    <div>
                        <input type="text" name="clubName" placeholder='모임 이름을 설정해주세요'/> <button>중복 확인</button>
                    </div>
                    <div className='selelctBoxdiv'>
                        <div>카테고리</div>
                        <select name="category" id="category">
                            <option value="테스트1">테스트1</option>
                            <option value="테스트1">테스트2</option>
                            <option value="테스트1">테스트3</option>
                            <option value="테스트1">테스트4</option>
                        </select>
                    </div>
                    <div className='selelctBoxdiv'>
                        <div>모임 인원</div>
                        <select name="signupLimit" id="signupLimit">
                            <option value="테스트1">테스트1</option>
                            <option value="테스트1">테스트2</option>
                            <option value="테스트1">테스트3</option>
                            <option value="테스트1">테스트4</option>
                        </select>
                    </div>
                    <div className='selelctBoxdiv'>
                        <div>나이 제한</div>
                        <select name="ageLimit" id="ageLimit">
                            <option value="테스트1">테스트1</option>
                            <option value="테스트1">테스트2</option>
                            <option value="테스트1">테스트3</option>
                            <option value="테스트1">테스트4</option>
                        </select>
                    </div>
                    <textarea name="clubDescription" id="clubDescription" spellcheck="false" placeholder='모임 소개를 입력해주세요'></textarea>

                    <input type="submit" value="모임 만들기" />
                </form>
            </div>
        </StyledCreateClubdiv>
    );
};

export default CreateClub;