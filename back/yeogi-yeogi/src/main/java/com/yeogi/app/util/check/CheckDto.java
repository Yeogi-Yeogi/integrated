package com.yeogi.app.util.check;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckDto {
    private String clubNo;
    private String memberNo;
    private String creatorYn;
    private String adminYn;
    private String delYn;

    public CheckDto(String clubNo, String memberNo) {
        this.clubNo = clubNo;
        this.memberNo = memberNo;
    }


}
