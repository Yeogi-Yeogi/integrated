package com.yeogi.app.review.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewVo {
    private String no;
    private String writerNo;
    private String boardNo;
    private String content;
    private String enrollDate;
    private String delYn;
}
