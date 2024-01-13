package com.yeogi.app.club.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

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

}
