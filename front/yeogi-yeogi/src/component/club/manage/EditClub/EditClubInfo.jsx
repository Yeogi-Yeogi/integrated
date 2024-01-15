import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledEditClubInfoDiv = styled.div`

    & > form {
        /* background-color: pink; */
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


    const signupLimit = [];
    for (let i = 5; i <= 20; i++) {
        signupLimit.push(<option key={i} value={i}>{i}</option>);
    }

    const ageLimit = [];
    for (let i = 5; i <= 20; i++) {
        ageLimit.push(<option key={i} value={i}>{i}</option>);
    }

    const handleChange = (e) => {
        setClubInfo({ 
            ...clubInfo, 
            clubDescription: e.target.value 
        });
    };
    return (
        <StyledEditClubInfoDiv>
            <form>
                <div>
                    <div>
                        <img
                            // src= {imgFile ? imgFile : `/img/defaultClubImage.png`}
                            src={clubInfo.fileUrl}
                            alt="클럽 대표 이미지"
                            id='previewImgTag'
                            style={{width: "100%", height: "100%", borderRadius:"10px"}}
                        />
                    </div>
                    <input type="file" name="f" id="fileInput" accept="image/*" />
                    <label htmlFor="fileInput">대표이미지 변경</label>
                </div>

                
                <div>  
                    <div>
                        <h2 style={{color:"#3A3A3A"}}>{clubInfo.name}</h2>
                        <span style={{color:"#3A3A3A"}}>모임장 {clubInfo.nick}</span>
                        <span style={{color:"#999999"}}>회원수 {clubInfo.memberCount}</span>
                        <button type='button' id='deleteBtn'>모임삭제</button>
                    </div>
                    <div>
                        <textarea name="" id="" cols="30" rows="10" value={clubInfo.clubDescription} onChange={handleChange} spellCheck="false">
                           
                        </textarea>
                    </div>
                    <div>
                        <span>모임 인원</span>
                        <select name="signupLimit" id="signupLimit">
                            <option value="" disabled selected>현재 인원제한 {clubInfo.signupLimit}</option>
                            {signupLimit}
                        </select>
                    </div>
                    <div>
                        <span>나이 제한</span>
                        <select name="ageLimit" id="ageLimit">
                            <option value="" disabled selected>현재 나이제한 {clubInfo.ageLimit}</option>
                            {ageLimit}
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="변경완료"/>
                        <button type='button'>취소</button>
                    </div>
                </div>  
            </form>
        </StyledEditClubInfoDiv>
    );
};

export default EditClubInfo;