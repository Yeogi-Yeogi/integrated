package com.yeogi.app.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yeogi.app.member.service.MemberService;
import com.yeogi.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
@RequestMapping("member")
@ResponseBody
@CrossOrigin(origins = "*")
public class MemberController {
	
	private final MemberService service;
	
	//회원가입
	@PostMapping("join")
	public Map<String,String> join(@RequestBody MemberVo vo, MultipartFile f) throws Exception {		
		int result = service.join(vo);
		
		Map<String, String> map = new HashMap<String, String>();
		if(result == 1) {
			map.put("msg", "good");			
		}else {
			
		}
		return map;	
	}
	
	// 로그인
	@PostMapping("login")
	public Map<String, Object> login(@RequestBody MemberVo vo) {
		MemberVo loginMember = service.login(vo);
		Map <String, Object> map = new HashMap<String, Object>();
		map.put("msg", "good");
		map.put("loginMember", loginMember);
		if(loginMember == null) {
			map.put("msg", "bad");
		}
		return map;
	}	
	
	
		
//	// 회원 탈퇴
//	@GetMapping("quit")
//	public Map<String, String> quit(@RequestBody MemberVo vo) throws Exception {
//		int result = service.quit(vo);
//		Map <>
//		if(result != 1) {
//			throw new Exception();
//		}
//		session.removeAttribute("loginMember");
//		session.setAttribute("alertMsg", "회원 탈퇴 완료");
//		return "redirect:/home";	
//	}
//	
//	// 로그아웃
//	@GetMapping("logout")
//	public String logout(HttpSession session) {
//		session.invalidate();
//		return "redirect:/home";
//
//	}
	
}
