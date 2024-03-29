import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Spinner, Table } from 'react-bootstrap';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import PreviewImg from '../board/PreviewImg';
import ScheduleDateTimePicker from './ScheduleDateTimePicker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const StyledNoticeWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;

    & > form {
        width: 80%;

        & textarea {
            resize: none;

            &:focus {
                border-color: #6c1895;
                box-shadow: 0 0 0 0.25rem rgba(108, 24, 149,.25);
            }
        }

        & td > input[type=text] {

            &:focus {
                border-color: #6c1895;
                box-shadow: 0 0 0 0.25rem rgba(108, 24, 149,.25);
            }
        }

        & td > div > input[type=text]:first-child {

            &:focus {
                border-color: #6c1895;
                box-shadow: 0 0 0 0.25rem rgba(108, 24, 149,.25);
            }
        }


        & tr > td:first-child {
            width: 10%;
        }

        & span {
            color: #999999;
            font-weight: 600;
        }
    }
`;
  
const StyledSwitch = styled(Form.Switch)`

    margin-bottom: 1em;
    & > .form-check-label {
        color: #999999;
    }

    & #custom-switch {
        

        &:focus {
            --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%236c1895%27/%3e%3c/svg%3e");
            border-color: #6C1895;
            box-shadow: 0 0 0 0.25rem rgba(108, 24, 149,.25);
        }

        &:checked {
            background-color: #6C1895; // 체크된 상태의 배경색
            border-color: #6C1895;
            --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23ffffff%27/%3e%3c/svg%3e");
            box-shadow: 0 0 0 0.25rem rgba(108, 24, 149,.25);

        }
    }
`;

const ImageInputDiv = styled.div`
    width: 120px;
    height:120px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.2em;
    border: 1px dashed #999999;
    border-radius: 10px;
    color: #999999;
    font-size: 2em;

    &:hover {
        cursor: pointer;
    }

    & > input {
        width: 100%;
        height: 100%;
    }
`;

const StyledButton = styled(Button)`
    background-color: #6c1895;
    border-color: #6c1895;
    font-weight: 600;
    width: 8em;

    &:hover {
        background-color: #5d1582;
    }
`;

const StyledCustomModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    z-index: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(15,15,15,0.5);

    & > div {
        padding: 1em;
        display: flex;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        width: 20%;
        height: 15%;
        background-color: #ffffff;

        & > div.spinner-border {
            margin: auto;
        }
    }
`;
const NoticeWrite = () => {

    const uploadImage = useRef(null);   //이미지 미리 보여주는 div
    const imgTd = useRef(null); //사진 올리는 td
    const [imageList, setImageList] = useState([]); //서버 전달용 파일 객체
    const [imageUrl, setImageUrl] = useState([]); //미리보기용 url
    const [title, setTitle] = useState();
    const [scheduleTitle, setScheduleTitle] = useState();
    const [scheduleDate , setScheduleDate] = useState(); //일정 시간
    const [scheduleLocation, setScheduleLocation] = useState();
    const [show ,setShow] = useState(false); //일정 생성 여부
    const [content, setContent] = useState();
    const {clubNo} = useParams();
    const [isFetching , setIsFetching] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = location.state?.isAdmin;
    const vo = JSON.parse(sessionStorage.getItem("loginMember"));
    const memberNo = vo?.no;

    useEffect(() => {
        if(!isAdmin) {
            alert('관리자만 이용 가능합니다');
            navigate(`/club/${clubNo}/commu/board/notice/list`);
            return;
        }
    }, [])

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleContent = (e) => {
        setContent(e.target.value);
    }

    const handleScheduleTitle = (e) => {
        setScheduleTitle(e.target.value);
    }

    const handleScheduleLocation = (e) => {
        setScheduleLocation(e.target.value);
    }

    const changeImage = () => {
        if(imageList.length === 3) {
            alert('이미지는 최대 3장까지 업로드 가능합니다.');
            return;
        }

        if (uploadImage.current) {
            uploadImage.current.click(); // input file 클릭 이벤트 호출
        }

    }
    
    const addImageFile = (event) => {
        //리스트에 추가
        const image = event.target.files[0];
        setImageList([...imageList, image]);
        //미리 보여주기
        showImage(image, imageList.length);
    }

    /**
     * 추가한 이미지 파일을 미리 보여주기
     * @param {*} image 
     */
    const showImage = (image, index) => {
        const reader = new FileReader();

        if(image) {
            reader.onloadend = () => {
                setImageUrl([...imageUrl ,reader.result]);
            };
            reader.readAsDataURL(image);
        }
    }

    // 선택한 미리보기 사진 삭제하는 함수
    const deleteImage = (index) => {
        // 이미지 리스트에서 해당 인덱스에 해당하는 이미지 제거
        const updatedImageList = [...imageList];
        updatedImageList.splice(index, 1);
        setImageList(updatedImageList);
      
        // 이미지 URL도 갱신
        const updatedImageUrl = [...imageUrl];
        updatedImageUrl.splice(index, 1);
        setImageUrl(updatedImageUrl);
      };

      const uploadBoard = (e) => {
        e.preventDefault();

        if(isFetching) {
            alert("등록중입니다.")
            return;
        }

        setIsFetching(true);



        const formData = new FormData();
        formData.append("content", content === undefined ? '내용이 없습니다.' : content);
        formData.append("clubNo", clubNo);
        formData.append("memberNo", memberNo);
        formData.append("noticeYn", "Y");
        if(show) {
            formData.append("scheduleTitle", scheduleTitle);
            formData.append("scheduleDate", scheduleDate);
            formData.append("scheduleLocation", scheduleLocation);
            formData.append("title", title === undefined ? '일정 등록' : title);
        } else {
            formData.append("title", title === undefined ? '공지 등록' : title);

        }
        imageList.forEach(el => formData.append("imageList", el));

        fetch(`http://localhost:8885/notice/add`, {
            method: "POST",
            body: formData
        })
        .then(async res => {
            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            return res.text();
        })
        .then(data => {
            alert(data);
            navigate(`/club/${clubNo}/commu/board/notice/list`);
        })
        .catch(e => {
            const message = e.message;
            alert(message);
            switch(message) {
                case "회원 전용 서비스입니다. 로그인하세요.":
                    navigate('/member/login');
                    break;
                case "관리자만 이용 가능합니다":
                    navigate(`/club/${clubNo}/commu/board/notice/list`);
                    break;
                case "공지사항 작성에 실패하셨습니다.":
                    break;
                default:
                    navigate(`/main`);
                    break;
            }
        })
        .finally(() => {
            setIsFetching(false);
        })
    }

    

    //////////////////////////////////////////////////////////
    return (
        <StyledNoticeWriteDiv>
            <h4><strong>게시글 작성하기</strong></h4>
            <Form onSubmit={uploadBoard}>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td>제목</td>
                            <td><Form.Control type="text" name='title' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td><Form.Control as="textarea" name='content' rows={10} onInput={handleContent}/></td>
                        </tr>
                        <tr>
                            <td>일정</td>
                            <td>
                                <StyledSwitch // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    label="일정 등록하기"
                                    onClick={() => setShow(!show)}
                                />
                                {show && (
                                            <div>
                                                <Form.Control type="text" name='scheduleTitle' onInput={handleScheduleTitle} placeholder="제목을 입력하세요" />
                                                <ScheduleDateTimePicker setScheduleDate={setScheduleDate}/>
                                                <Form.Control type="text" name='scheduleLocation' onInput={handleScheduleLocation} placeholder="장소를 입력하세요" />
                                            </div>
                                        )}
                            </td>
                        </tr>
                        <tr>
                            <td>사진</td>
                            <td style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridAutoRows: 'true' }}>
                                
                            {
                                imageUrl.map((element, index) => (
                                    <div key={uuidv4()} style={{ position: 'relative' }}>
                                        <PreviewImg src={element} />
                                        <Button
                                        size="sm"
                                        style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#6c1895' }}
                                        onClick={() => deleteImage(index)}
                                        >
                                        X
                                        </Button>
                                    </div>
                                ))}
                                <Form.Control ref={uploadImage} onChange={addImageFile} type="file" name="imageList" id='imageList' hidden/>
                                <ImageInputDiv onClick={changeImage}>+</ImageInputDiv>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><span>사진은 최대 3장까지 업로드 가능합니다.</span></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td ref={imgTd} style={{ textAlign: 'right' }}><StyledButton type="submit" >작성하기</StyledButton></td>
                        </tr>
                    </tbody>
                </Table>
                {
                    isFetching && 
                    <StyledCustomModal>
                        <div>
                            <Spinner animation="border" />
                            <h4>잠시만 기다려주세요.</h4>
                        </div>
                    </StyledCustomModal>
                }
            </Form>
        </StyledNoticeWriteDiv>
    );
};

export default NoticeWrite;