import React from 'react';
import styled from 'styled-components';
import SearchBar from './main/SearchBar';
import MainClubList from './main/MainClubList';

const StyledMainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Main = () => {
    return (
        <StyledMainDiv>
            <SearchBar/>
            <MainClubList/>            
        </StyledMainDiv>
    );
};

export default Main;