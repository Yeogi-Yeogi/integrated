package com.yeogi.app.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDetailDto {
    private String reviewNo;
    private String memberProfile;
    private String memberNick;
    private String enrollDate;
    private String content;
}
