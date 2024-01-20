import React from 'react';
import styled from 'styled-components';
import MainClubList from './MainClubList';

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
                position: relative; /* 부모 요소에 position: relative 추가 */
            }
            & input[type="text"] {
                width: 300px;
                /* border: 2px solid #999999; */
                border: none;
                border-radius: 10px;
                height: 35px;
                margin: 10px;
                padding: 10px;
                outline: none;
                font-size: 0.8rem;
                background-color: rgba(108, 24, 149, 0.2);
                text-align: center;
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

    const searchInput = (e) => {
        e.preventDefault();

        alert("zzzz");
    };

    return (
        <StyledSearchBarDiv>
            <div>
                <form onSubmit={searchInput}>
                    <span>검색하기</span>
                    <div class="input-container">
                        <input type="text" placeholder="검색 할 모임명 입력"/>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        </StyledSearchBarDiv>
    );
};

export default SearchBar;