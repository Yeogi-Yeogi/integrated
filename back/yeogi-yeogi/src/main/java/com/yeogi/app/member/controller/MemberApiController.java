package com.yeogi.app.member.controller;

import java.io.File;
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
import org.springframework.web.multipart.MultipartFile;

import com.yeogi.app.member.service.MemberService;
import com.yeogi.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;


@Controller
@RequestMapping("member")
@ResponseBody
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MemberApiController {
	
    private final MemberService service;

    //회원가입
    @PostMapping("join")
    public Map<String,String> join(MemberVo vo , MultipartFile profileImg) throws Exception {
    	System.out.println("vo : " + vo);
    	System.out.println("profileImg : " + profileImg);
    	System.out.println("profileImg.getOriginalFilename : " + profileImg.getOriginalFilename());
    	
    	String fullPath = saveFile(profileImg);
		vo.setFullPath(fullPath);
		
        int result = service.join(vo); 
        
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}        
		System.out.println("return 직전 ~~~");
        return map;
    }
    
    /**
	 * 파일을 서버에 저장하고, 파일 전체 경로를 리턴함
	 * @param 파일객체
	 * @param 파일경로
	 * @return 실제파일저장경로(파일경로+파일명)
	 * @throws Exception
	 */	 
	private String saveFile(MultipartFile profileImg) throws Exception {
		
		// 저장할 경로 설정
		String path = "C:\\dev\\profileImg\\";
		
		// 업로드된 파일의 원래 이름 획득
		String originName = profileImg.getOriginalFilename();
		
		//원래는 "path + changeName(랜덤값) + 확장자" 로 해야함// 저장할 파일의 전체 경로 설정
		File target = new File(path + originName);	

		//파일 바이트바코드 읽어서 타겟에 저장
		profileImg.transferTo(target);
		
		return path + originName;
	}
    
    //아이디 중복 확인
    @PostMapping("idCheck")
    public Map<String, Object> idCheck(@RequestBody MemberVo vo) throws Exception {
    	MemberVo idCheck = service.idCheck(vo);
//    	System.out.println(idCheck.getId());
    	Map<String, Object> map = new HashMap<String, Object>();
    	map.put("msg","good");
        map.put("idCheck", idCheck);
        System.out.println("로그인: " + idCheck);
        if(idCheck != null ) {
        	map.put("msg", "bad");
        }
        return map;
    }    
    
	// 로그인
    @PostMapping("login")
    public Map<String, Object> login(@RequestBody MemberVo vo) throws Exception {
        MemberVo loginMember = service.login(vo);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("msg","good");
        map.put("loginMember", loginMember);
        System.out.println("로그인: " + loginMember);
        if(loginMember == null ) {
        	map.put("msg", "bad");
        }
        return map;        
    }
    
    // 회원 탈퇴-회원정보페이지에서 회원탈퇴버튼 누르면 실행(로그인이 된 사람만 회원탈퇴가 가능한 구조)
    @PostMapping("quit")
    public Map<String,String> quit(@RequestBody MemberVo vo) throws Exception {
        int result = service.quit(vo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}        
        return map;
        
    }

    //회원정보조회
    @PostMapping("mySelect")
    public Map<String, Object> mySelect(@RequestBody MemberVo vo) throws Exception {
    	
    	MemberVo loginMember = service.mySelect(vo);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("msg","good");
        map.put("loginMember", loginMember);
        System.out.println(loginMember);
        if( loginMember == null ) {
        	map.put("msg", "bad");
        }
        return map;  
    }
    
    //내 정보 수정하기 
    @PostMapping("edit")
    public Map<String,String> edit(@RequestBody MemberVo vo) throws Exception {
        int result = service.edit(vo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}        
        return map;        
    }
        
//    @PostMapping("memberLogin")
//    public 
        
}//class
