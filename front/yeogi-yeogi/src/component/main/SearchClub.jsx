import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { useLocation } from 'react-router-dom';
import ClubListItem from './ClubListItem';

const StyledSearchClubDiv = styled.div`
    display: flex;
    justify-content: center;

    #mainContainer{
        display: grid;
        height: 1100px;
        width: 1200px;
    }

    .clubList{
        height: 600px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 30px;
        justify-items: center;
        overflow: scroll;
        overflow-x: hidden;
        align-items: center;
    }

    #searchHeader{
        margin-top: 100px;
        height: 100px;
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

    ::-webkit-scrollbar {
        width: 10px;  
    }

    ::-webkit-scrollbar-thumb {
        background-color: #ffc0c0;
        border-radius: 10px; 
    }

    ::-webkit-scrollbar-track {
        background: rgba(220, 20, 60, .1); 
    }
`;

const SearchClub = () => {

    const location = useLocation();

    const searchClubList = location.state.searchClubList;
    const searchText = location.state.searchText;

    console.log("검색결과 화면 ::: ", searchClubList);

    return (
        <StyledSearchClubDiv>
            <div id='mainContainer'>
                <div id='searchHeader'>
                    <h3>'{searchText}'에 대한 검색결과</h3>
                </div>
                <div className='clubList'>
                    {searchClubList.map((club) =>(
                        <ClubListItem key={club.no} club={club}/>
                    ))}
                </div>
                <div id='searchBarContainer'>
                    <SearchBar/>
                </div>
            </div>
        </StyledSearchClubDiv>
    );
};

export default SearchClub;