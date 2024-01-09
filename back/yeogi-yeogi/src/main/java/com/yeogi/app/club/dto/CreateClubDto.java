package com.yeogi.app.club.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateClubDto {

    private String name;
    private String categoryNo;
    private String creatorNo;
    private String ageLimit;
    private String signupLimit;
    private String clubDescription;
    private String fileUrl;
    private String fileName;
    private MultipartFile file;
}
