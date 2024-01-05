package com.yeogi.app.club.dto;

import lombok.Data;

@Data
public class EditClubMemberDto {

    private String memberNo; // 멤버 번호
    private String clubNo; // 클럽 번호
    private String adminYn; // 어드민인가..?

}
