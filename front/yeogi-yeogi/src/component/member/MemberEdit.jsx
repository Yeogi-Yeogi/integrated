import React from 'react';
import styled from 'styled-components';

const StyledMemberEditDiv =styled.div`
    
`;    

const MemberEdit = () => {

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
    //     const{name, value} = event.target;

    //     setVo({
    //         ...vo,
    //         [name] : value
    //     });
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
                        <td></td>
                    </tr>
                    <tr>
                        <td id="text">아이디</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id="text">비밀번호</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id="text">닉네임</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id="text">전화번호</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id="text">이메일</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td id="text">주민등록번호</td>
                        <td><input type="text" id='resiNum' name="resiNum" placeholder='주민등록번호를 입력하세요' onChange={handleInputChange}/></td>
                    </tr>
                </table>
            </form>
        </StyledMemberEditDiv>
    );
};

export default MemberEdit;