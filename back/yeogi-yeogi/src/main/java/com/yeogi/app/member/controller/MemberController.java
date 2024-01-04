package com.yeogi.app.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yeogi.app.member.service.MemberService;
import com.yeogi.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
	
	private final MemberService service;
	
	//회원가입
	@PostMapping("join")
	public void join(MemberVo vo) {
		int result = service.join(vo);
		
	}
	

}
