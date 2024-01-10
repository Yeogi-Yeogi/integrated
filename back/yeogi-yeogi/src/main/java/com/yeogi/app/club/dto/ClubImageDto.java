package com.yeogi.app.club.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClubImageDto {

    private String no;
    private String fileUrl;
    private String fileName;
    public ClubImageDto(String fileUrl, String fileName){
        this.fileUrl = fileUrl;
        this.fileName = fileName;
    }
}
