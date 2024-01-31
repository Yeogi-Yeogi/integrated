import React from 'react';
import styled from 'styled-components';
import MainProduce from './MainProduce';
import SelectMyClub from './SelectMyClub';
import SearchBar from './SearchBar';
import MainClubList from './MainClubList';
import { useMemberMemory } from '../context/MemberContext';
// import Slide from './Slide';


const StyledMainLayoutDiv = styled.div`
   
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainLayout = () => {

    const {loginMember , setLoginMember}  = useMemberMemory();

    //sessionStorage에서 loginMember값을 가져온다
    const storedLoginMember = sessionStorage.getItem('loginMember');

    //loginMember 값이 null인지에따라 SelectMyClub컴포넌트의 렌더링 유무를 정함
    if(storedLoginMember === null){
        return (
            <StyledMainLayoutDiv>
                <MainProduce/>
                <MainClubList/>                   
                <SearchBar/>
            </StyledMainLayoutDiv>
        );
    }else{
        return (
            <StyledMainLayoutDiv>
                <MainProduce/>
                {/* <SelectMyClub/> */}
                <MainClubList/>                   
                <SearchBar/>
            </StyledMainLayoutDiv>
        );
    }
};

export default MainLayout;