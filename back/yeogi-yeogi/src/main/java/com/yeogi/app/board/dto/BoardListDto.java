package com.yeogi.app.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardListDto {
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
    //조회수
    private String hit;
    //내용
    private String content;
    //첫번째 사진경로
    private String imagePath;
    //전체 사진 개수
    private Long imageCount;
    //댓글 개수
    private String reviewCount;
}
