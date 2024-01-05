package com.yeogi.app.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewAddDto {
    private String writerNo;
    private String boardNo;
    private String clubNo;
    private String content;
}
