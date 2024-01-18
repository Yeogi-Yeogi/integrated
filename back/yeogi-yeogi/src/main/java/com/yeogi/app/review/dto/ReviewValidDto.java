package com.yeogi.app.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewValidDto {
    private String reviewNo;
    private String clubNo;
    private String boardNo;
    private String writerNo;
}
