import React from 'react';
import styled from 'styled-components';


const StyledMainLayoutDiv = styled.div`
    width: 100%;
    margin: auto;

    & > div {
        /* width: 70em; */
        display: flex;
        justify-content: space-between;
        margin: auto;
    }
`;

const MainLayout = () => {
    return (
        <StyledMainLayoutDiv>
            <div>
                <Routes>
                    <Route path='/main/mainStart' element={<MainStart/>}/>
                    <Route path='/main'element={<MemberLogin/>}/>
                    <Route path='/main' element={<MemberQuit/>}/>
                </Routes>  
            </div>                   
        </StyledMainLayoutDiv>
    );
};

export default MainLayout;