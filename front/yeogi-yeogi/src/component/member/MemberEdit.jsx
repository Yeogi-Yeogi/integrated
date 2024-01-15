import React from 'react';
import styled from 'styled-components';

const StyledMemberEditDiv =styled.div`
    
`;

const MemberEdit = () => {
    return (
        <StyledMemberEditDiv>
           <h4><strong>내 정보 수정하기</strong></h4>
            <Form onSubmit={handleMemberEditSubmit}>
                <Table borderless>
                    <tbody>
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
                            <td><span>수정할 대표 이미지를 1개만 선택해주세요.</span></td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td><Form.Control type="text" name='name' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>아이디</td>
                            <td><Form.Control type="text" name='id' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><Form.Control type="text" name='pwd' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td><Form.Control type="text" name='name' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>닉네임</td>
                            <td><Form.Control type="text" name='name' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td><Form.Control type="text" name='name' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><Form.Control type="text" name='name' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        <tr>
                            <td>주민등록번호</td>
                            <td><Form.Control type="text" name='name' onInput={handleTitle} placeholder="제목을 입력하세요" /></td>
                        </tr>
                        
                        <tr>
                            <td></td>
                            <td ref={imgTd} style={{ textAlign: 'right' }}><StyledButton type="submit" >변경하기</StyledButton></td>
                        </tr>
                    </tbody>
                </Table>
            </Form>
        </StyledMemberEditDiv>
    );
};

export default MemberEdit;