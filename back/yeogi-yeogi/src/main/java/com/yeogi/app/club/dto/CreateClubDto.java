package com.yeogi.app.club.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class CreateClubDto {

    private String name;
    private String categoryNo;
    private String creatorNo;
    private String ageLimit;
    private String signupLimit;
    private String clubDescription;
    private ClubImageDto clubImageDto;

}
