import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { useLocation } from 'react-router-dom';

const StyledSearchClubDiv = styled.div`
    /* background-color: #ffffb0; */
    display: flex;
    justify-content: center;

    #mainContainer{
        display: grid;
        height: 900px;
        width: 1200px;
    }

    #searchHeader{
        margin-top: 100px;
    }
    #searchHeader > h3 {
        border-bottom: 2px solid #AFAFAF;
        color: #3A3A3A;
        height: 42px;
    }
    #searchBarContainer{
        display: flex;
        align-items: flex-end;
    }
`;

const SearchClub = () => {

    const location = useLocation();

    const searchClubList = location.state.searchClubList;

    console.log("검색결과 화면 ::: ", searchClubList);

    return (
        <StyledSearchClubDiv>
            <div id='mainContainer'>
                <div id='searchHeader'>
                    <h3>'낙천'에 대한 검색결과</h3>
                </div>
                <div className='clubList'>
                    
                </div>
                <div></div>
                <div id='searchBarContainer'>
                    <SearchBar/>
                </div>
            </div>
        </StyledSearchClubDiv>
    );
};

export default SearchClub;