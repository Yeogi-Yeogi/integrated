import React from 'react';
import styled from 'styled-components';

const StyledMemberJoinDiv = styled.div`
    
`;

const MemberJoin = () => {

    const handleMemberJoinSubmit = () => {

    }

    return (
        <StyledMemberJoinDiv>
            <div>
                <form onSubmit={handleMemberJoinSubmit}>
                    <div>
                        <div>
                            <div>이름 <input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>비밀번호<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>비밀번호 확인<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>닉네임<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>전화번호<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>이메일<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>주민등록번호<input type="text" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                            <div>대표 프로필 이미지<input type="submit" id='name' name="name" placeholder='이름을 입력하세요'/></div>
                        </div>
                        <div><input type="submit" value="회원가입"/></div>
                    </div>
                </form>
            </div>            
        </StyledMemberJoinDiv>
    );
};

export default MemberJoin;