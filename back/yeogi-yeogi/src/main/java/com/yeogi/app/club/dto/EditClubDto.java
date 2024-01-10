package com.yeogi.app.club.dto;

import lombok.Data;

@Data
public class EditClubDto {

    // 대표이미지 변경, 소개글 변경, 모임인원 변경, 가입 연령 변경,
    // 회원관리 ( 관리자 지정, 추방? )
    private String clubNo; // 클럽 번호
    private String clubDescription; // 소개글 변경
    private String ageLimit; // 가입 연령 변경
    private String signupLimit; // 모임인원 변경
    private String clubImageFile; // 클럽 대표이미지 변경

    // type 만들어서 그거에 따라서..?
}
