import React from 'react';
import styled from 'styled-components';
import MyPageSideBar from '../club/comunnity/board/common/MyPageSideBar';

const StyledMemberQuitDiv =styled.div`
    width: 100%;
    margin: auto;
    
    & > div {
        width: 70em;
        display: flex;
        justify-content:space-evenly;
        margin: auto;       
    }

    #quit{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left:200px
    }
    
`;    

const MemberQuit = () => {
    return (
        <StyledMemberQuitDiv>
            <div>
                <MyPageSideBar/>
                <div id="quit">

                </div>                
            </div> 
        </StyledMemberQuitDiv>
    );
};

export default MemberQuit;