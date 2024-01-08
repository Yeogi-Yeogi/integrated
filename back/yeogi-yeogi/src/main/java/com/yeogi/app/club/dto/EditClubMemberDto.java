package com.yeogi.app.club.dto;

import com.yeogi.app.member.vo.MemberVo;
import lombok.Data;

import java.util.List;

@Data
public class EditClubMemberDto {

    private String no; // 클럽 번호
    private String memberNo; // 멤버 번호
    private String editType; // 관리자 지정, 관리자 해제, 회원 추방 등등,,,


}
