package com.yeogi.app.club.dto;

import lombok.Data;

@Data
public class CreateClubDto {

    private String clubImageFile;
    private String name;
    private String categoryNo;
    private String creatorNo;
    private String ageLimit;
    private String signupLimit;
    private String clubDescription;
}
