package com.yeogi.app.review.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 리뷰 더 가져올 때 요청하는 변수들
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReqDto {
    private String clubNo;
    private String memberNo;
    private String boardNo;
}
