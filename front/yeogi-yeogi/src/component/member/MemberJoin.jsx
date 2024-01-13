import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberJoinDiv = styled.div`
    
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

    // let isFetching = false;
    // const [vo,setVo] = useState({
    //     name: "",
    //     id :"",
    //     pwd: "",
    //     nick: "",
    //     phone:"",
    //     email:"",
    //     resiNum:"",
    // })
    // const navigate = useNavigate();

    // const handleInputChange = (event) => {
    //     const{name, value} = event.target;

    //     setVo({
    //         ...vo,
    //         [name] : value
    //     });
    // }

    
    // const handleMemberJoinSubmit = (event) => {
    //     event.preventDefault();

    //     if(isFetching){
    //         alert('회원가입이 이미 진행');
    //         return;
    //     }else{
    //         isFetching = true;
    //     }

    //     fetch("http://127.0.0.1:8888/yeogi/member/join", {
    //     method:"post",
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     body: JSON.stringify(vo)
    //     })
    //     .then( resp => {
    //         if(!resp.ok){
    //             throw new error("회원가입 fetch 실패...");
    //         }
    //         return resp.json();
    //     })
    //     .then( data => {
    //         if(data.msg === "good"){
    //             alert("회원가입 성공!");
    //             navigate("/");
    //         }else{
    //             alert("회원가입 실패..");
    //             navigate("/failpage");
    //         }
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //         alert("회원가입 실패");
    //     })
    //     .finally( () => {
    //         isFetching = false;
    //     })
    //     ;

    // }

    
    return (
        <StyledMemberJoinDiv>
            <div>
                <form>
                    <div>
                        <div>
                            <div>이름 <input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>비밀번호<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>비밀번호 확인<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>닉네임<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>전화번호<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>이메일<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>주민등록번호<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            {/* <div>
                                <img src={imgFile ? imgFile : `/img/defaultMemberImage.png`}
                                    alt="대표프로필이미지" id='previewImgTag'
                                />
                            </div>
                            <input type="file" name="f" id="fileInput" accept="image/*" onchange={handleChangeFile} ref={imgRef}/>
                            <label htmlFor="fileInput">사진선택</label> */}
                        </div>
                        {/* <div>
                            <input type="text" name="MemberName" placeholder='모임'
                        </div> */}
                        <div><input type="submit" value="회원가입"/></div>
                    </div>
                </form>
            </div>            
        </StyledMemberJoinDiv>
    );
};

export default MemberJoin;