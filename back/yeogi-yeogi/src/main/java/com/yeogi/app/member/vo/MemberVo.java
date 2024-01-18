package com.yeogi.app.member.vo;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MemberVo {
	private String no;
	private String name;
	private String id;
	private String pwd;
	private String nick;
	private String phone;
	private String email;
	private String quitYn;
	private String enrollDate;
	private String modifiedDate;
	private String fullPath;
	private String resiNum;
	
}
