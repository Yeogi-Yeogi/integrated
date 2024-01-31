import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainClubList from './MainClubList';
import { useNavigate } from 'react-router-dom';

const StyledSearchBarDiv = styled.div`
    /* background-color: bisque; */
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div:first-child {
        width: 400px;
        height: 150px;
        /* background-color: red; */
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        & > form {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            & > span {
                margin-bottom: 10px;
                font-weight: bold;
            }
            & > div.input-container {
                position: relative; 
                display: flex;
                flex-direction: row;
                width: 300px;
                border: none;
                border-radius: 10px;
                height: 35px;
                margin: 10px;
                padding: 10px;
                outline: none;
                font-size: 0.8rem;
                background-color: rgba(108, 24, 149, 0.2);
                text-align: center;
                & > select {
                    border: none;
                    font-size: 0.8rem;
                    outline: none;
                    background-color: rgba(108, 24, 149, 0);
                }
            }
            & input[type="text"] {
                /* width: 300px; */
                /* border: 2px solid #999999; */
                border: none;
                /* border-radius: 10px; */
                /* height: 35px; */
                /* margin: 10px; */
                /* padding: 10px; */
                outline: none;
                /* font-size: 0.8rem; */
                /* background-color: rgba(108, 24, 149, 0.2); */
                text-align: center;
                background-color: rgba(108, 24, 149, 0);
            }
            & input[type="submit"]{
                position: absolute;
                top: 50%;
                right: 5px;
                transform: translateY(-50%);
                padding: 10px;
                font-size: 16px;
                background-color: transparent;
                color: transparent;
                border: none;
                border-radius: 0 5px 5px 0;
                cursor: pointer;
                background-image: url('/img/icon_Search.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: 18px;
            }

        }
    }
`;

// 메인 Search하는 칸
const SearchBar = () => {
    // 카테고리 만들어야하나,..?
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState("name");

    const handleChangeInput = (input) => {
        setSearchText(input.target.value);
    }

    const handleChangeCategory = (input) => {
        setSearchCategory(input.target.value);
    }


    
    const searchInput = (e) => {
        e.preventDefault();
        if (!searchText || searchText.trim() === "") {
            alert("검색어를 입력하세요.");
            return;
        }

        fetch(`http://127.0.0.1:8885/club/searchClub/${searchCategory}/${searchText}`)
        .then(resp => resp.json())
        .then(clubList => {
            navigate("/searchClub", {
                state : {
                    searchClubList : clubList,
                    searchText : searchText,
                },              
            });
        })
    };


    return (
        <StyledSearchBarDiv>
            <div>
                <form onSubmit={searchInput}>
                    <span>검색하기</span>
                    <div class="input-container">
                        <select onChange={handleChangeCategory}>
                            <option value="name">모임명</option>
                            <option value="category">카테고리</option>
                            <option value="clubDescription">모임설명</option>
                        </select>
                        <input type="text" name='searchText' placeholder="검색 할 모임명 입력" onChange={handleChangeInput}/>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        </StyledSearchBarDiv>
    );
};

export default SearchBar;