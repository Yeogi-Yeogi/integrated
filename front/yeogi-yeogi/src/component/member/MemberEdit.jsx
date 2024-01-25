import React, { useState } from 'react';
import styled from 'styled-components';
import MyPageSideBar from '../club/comunnity/board/common/MyPageSideBar';

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
    
`;    

const MemberEdit = () => {

    // let isFetching = false;
    const [vo,setVo] = useState(JSON.parse(sessionStorage.getItem('loginMember')))

    // const navigate = useNavigate();

    // const [imgFile, setImgFile] = useState("");
    // // const imgRef = useRef();

    // const handleChangeFile = () => {
    //     if (!imgRef.current.files.length) {
    //         // 파일 선택 취소했을때
    //         return;
    //     }
      
    //     const file = imgRef.current.files[0];
    //     const fileReader = new FileReader();
    //     fileReader.readAsDataURL(file);
    //     fileReader.onloadend = () => {
    //         setImgFile(fileReader.result);
    //     };

    //     setVo({
    //         ...vo , 
    //         profileImg : file ,
    //     });
    // };

    const handleInputChange = (event) => {
        const{name, value} = event.target;

        setVo({
            ...vo,
            [name] : value
        });
    }

    const handleMemberMySelectSubmit = (event) => {
        // event.preventDefault();

        // if(isFetching){
        //     alert('회원가입이 이미 진행');
        //     return;
        // }else{
        //     isFetching = true;
        // }

        // const formData = new FormData();

        // //각 입력 필드의 값을 FormData에 추가
        // formData.append('name',vo.name);
        // formData.append('id', vo.id);
        // formData.append('pwd', vo.pwd);
        // formData.append('nick', vo.nick);
        // formData.append('phone', vo.phone);
        // formData.append('email', vo.email);
        // formData.append('resiNum', vo.resiNum);
        // formData.append('profileImg', vo.profileImg);


        // fetch("http://127.0.0.1:8885/member/join", {
        // method:"post",
        // // headers:{
        // //     "Content-Type":"application/json"
        // // },
        // body: formData //JSON.stringify(vo)
        // })
        // .then( resp => {
        //     if(!resp.ok){
        //         // throw new error("회원가입 fetch 실패...");
        //     }
        //     return resp.json();
        // })
        // .then( data => {
        //     if(data.msg === "good"){
                
        //         alert("회원가입 성공!");
        //         navigate("/");
        //     }else{
        //         alert("회원가입 실패..");
        //         navigate("/failpage");
        //     }
        // })
        // .catch((e) => {
        //     console.log(e);
        //     alert("회원가입 실패");
        // })
        // .finally( () => {
        //     isFetching = false;
        // })
        // ;

    }



    return (
        <StyledMemberEditDiv>
            <div>
                <MyPageSideBar/>
                <form onSubmit={handleMemberMySelectSubmit} encType="multipart/form-data">
                    <table id="table-container">
                        {/* <tr>
                            <td colSpan={3}>
                                <div>
                                    <div>
                                        <img
                                            src= {imgFile ? imgFile : `/img/defaultClubImage.png`}
                                            alt="프로필 이미지"
                                            id='previewImgTag'
                                            style={{width: "50%", height: "50%", borderRadius: "10px"}}
                                        />
                                    </div>
                                    <input type="file" name="f" id="fileInput" accept="image/*" onChange={handleChangeFile} ref={imgRef}/>
                                    <label htmlFor="fileInput" >사진 선택</label>
                                </div>
                            </td>
                        </tr> */}
                        <tr>
                            <td id="text">이름</td>
                            <td><input type="text" id='name' name="name" placeholder={vo.name} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">아이디</td>
                            <td><input type="text" id="name" name="name" value={vo.id} readOnly/></td>
                        </tr>
                        <tr>
                            <td id="text">비밀번호</td>
                            <td><input type="text" id='name' name="pwd" placeholder={vo.pwd} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">닉네임</td>
                            <td><input type="text" id='name' name="nick" placeholder={vo.nick} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">전화번호</td>
                            <td><input type="text" id='name' name="phone" placeholder={vo.phone} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">이메일</td>
                            <td><input type="text" id='name' name="email" placeholder={vo.email} onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td id="text">주민등록번호</td>
                            <td><input type="text" id="name" name="name" value={vo.resiNum} readOnly/></td>
                        </tr>
                    </table>
                </form>
            </div> 
        </StyledMemberEditDiv>
    );
};

export default MemberEdit;