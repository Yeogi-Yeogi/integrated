import React from 'react';
import styled from 'styled-components';
import MainProduce from './MainProduce';
import SelectMyClub from './SelectMyClub';
import SearchBar from './SearchBar';
import MainClubList from './MainClubList';


const StyledMainLayoutDiv = styled.div`
   
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainLayout = () => {
    return (
        <StyledMainLayoutDiv>
            <MainProduce/>
            <SelectMyClub/>
            <SearchBar/>
            <MainClubList/>                   
        </StyledMainLayoutDiv>
    );
};

export default MainLayout;