package com.yeogi.app.club.dto;

import lombok.Data;

@Data
public class ClubSearchDto {

    private String searchMenu;
    private String searchString;

    public ClubSearchDto(String searchCategory, String searchText) {
        this.searchMenu = searchCategory;
        this.searchString = searchText;
    }
}
