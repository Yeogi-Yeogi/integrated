import React from 'react';
import styled from 'styled-components';

const StyledMemberMySelectDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: 70px;
    width: 100vw;

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


    & > div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
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

const MemberMySelect = () => {

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
    //         alert('회원가입이 이미 진행');
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
    //             // throw new error("회원가입 fetch 실패...");
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

    }

    
    return (
        <StyledMemberMySelectDiv>
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
        </StyledMemberMySelectDiv>
    );
};

export default MemberMySelect;