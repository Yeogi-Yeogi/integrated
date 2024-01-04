package com.yeogi.app.board.dto;

import com.yeogi.app.review.dto.ReviewDetailDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDetailDto {

    //게시글 번호
    private String boardNo;
    //프로필 이미지
    private String memberProfile;
    //작성자
    private String memberName;
    //작성일자
    private String enrollDate;
    //제목
    private String title;
    //내용
    private String content;
    //이미지 파일 보기
    private List<String> images;
    //리뷰들
    private List<ReviewDetailDto> reviews;
}
