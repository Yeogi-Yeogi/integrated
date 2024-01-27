package com.yeogi.app.member.vo;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MemberVo {
	private String no;//회원번호
	private String name;//회원이름
	private String id;//아이디
	private String pwd;//비밀번호
	private String nick;//닉네임
	private String phone;//전화번호
	private String email;//이메일
	private String quitYn;//회원탈퇴여부
	private String enrollDate;//가입일자
	private String modifiedDate;//수정일자
	private String fullPath;//프로필이미지 경로
	private String resiNum;//주민등록번호
	
}
