import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import styled from 'styled-components';
import PreviewImg from './PreviewImg';

const StyledBoardWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    margin-top: 3em;
    padding-left: 2em;

    & > form {
        width: 80%;

        & tr > td:first-child {
            width: 10%;
        }

        & span {
            color: #999999;
            font-weight: 600;
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
const BoardWrite = () => {

    const uploadImage = useRef(null);   //이미지 미리 보여주는 div
    const imgTd = useRef(null); //사진 올리는 td
    const [imageList, setImageList] = useState([]);

    const [imageUrl, setImageUrl] = useState([]);

    
    const uploadBoard = (e) => {
        e.preventDefault();

        console.log(imageList);
    }

    const changeImage = () => {
        if(imageList.length === 10) {
            alert('이미지는 최대 10장까지 업로드 가능합니다.');
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
        showImage(image, imageList.length-1);
    }

    /**
     * 추가한 이미지 파일을 미리 보여주기
     * @param {*} image 
     */
    const showImage = (image, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl([...imageUrl ,{
                "index": index,
                "src": reader.result
            }]);
        };
        reader.readAsDataURL(image);
    }

    // 선택한 미리보기 사진 삭제하는 함수
    const deleteImage = (e) => {
        console.log(e.target);
        // 기존의 이미지 리스트를 복사한 후, index에 해당하는 이미지를 제외
        // const updatedImageList = [...imageList];
        // updatedImageList.splice(index, 1);
        // setImageList(updatedImageList);

        // const updatedImageUrl = [...imageUrl];
        // updatedImageUrl.splice(index, 1);
        // setImageUrl(updatedImageUrl);
    }
    //////////////////////////////////////////////////////////
    return (
        <StyledBoardWriteDiv>
            <h4><strong>게시글 작성하기</strong></h4>
            <Form onSubmit={uploadBoard}>
                <Table borderless>
                    <tbody>
                        <tr>
                            <td>제목</td>
                            <td><Form.Control type="text" placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td><Form.Control as="textarea" rows={10} /></td>
                        </tr>
                        <tr>
                            <td>사진</td>
                            <td style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridAutoRows: 'true' }}>
                                
                                {   //컴포넌트화 하기
                                    imageUrl.map(element => (
                                        <div key={element.index} style={{ position: 'relative' }}>
                                            <PreviewImg src={element.src} />
                                            <Button
                                                size="sm"
                                                style={{ position: 'absolute', top: 0, right: 0 }}
                                                onClick={(e) => deleteImage(e)}
                                            >
                                                X
                                            </Button>
                                        </div>
                                    ))
                                }
                                <Form.Control ref={uploadImage} onChange={addImageFile} type="file" name="imageList" id='imageList' hidden multiple/>
                                <ImageInputDiv onClick={changeImage}>+</ImageInputDiv>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><span>사진은 최대 10장까지 업로드 가능합니다.</span></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td ref={imgTd} style={{ textAlign: 'right' }}><StyledButton type="submit" >작성하기</StyledButton></td>
                        </tr>
                    </tbody>
                </Table>
            </Form>
        </StyledBoardWriteDiv>
    );
};

export default BoardWrite;