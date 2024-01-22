import React from 'react';
import styled from 'styled-components';

const StyledMemberEditDiv =styled.div`
    
`;

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

    const handleInputChange = (event) => {
        //     const{name, value} = event.target;
    
        //     setVo({
        //         ...vo,
        //         [name] : value
        //     });
        }
    
        
        const handleMemberMySelectSubmit = (event) => {
        //     event.preventDefault();
    
        //     if(isFetching){
        //         alert('회원정보수정 이미 진행');
        //         return;
        //     }else{
        //         isFetching = true;
        //     }
    
        //     fetch("http://127.0.0.1:8885/member/join", {
        //     method:"post",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify(vo)
        //     })
        //     .then( resp => {
        //         if(!resp.ok){
        //             // throw new error("회원정보수정 fetch 실패...");
        //         }
        //         return resp.json();
        //     })
        //     .then( data => {
        //         if(data.msg === "good"){
                    
        //             alert("회원정보수정 성공!");
        //             navigate("/");
        //         }else{
        //             alert("회원정보수정 실패..");
        //             navigate("/failpage");
        //         }
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //         alert("회원정보수정 실패");
        //     })
        //     .finally( () => {
        //         isFetching = false;
        //     })
        //     ;
    
        }

const MemberEdit = () => {
    return (
        <StyledMemberEditDiv>
            <form onSubmit={handleMemberMySelectSubmit} encType="multipart/form-data">
                <table id="table-container">
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