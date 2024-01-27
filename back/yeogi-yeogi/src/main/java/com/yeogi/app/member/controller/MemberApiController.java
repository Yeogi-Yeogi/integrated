package com.yeogi.app.member.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.yeogi.app.member.dao.MemberDao;
import com.yeogi.app.member.service.MemberService;
import com.yeogi.app.member.vo.MemberVo;
import com.yeogi.app.member.vo.selectMyClubVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Controller
@RequestMapping("member")
@ResponseBody
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class MemberApiController {
	
    private final MemberService service;
    private final MemberDao dao;

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
	 */	 //회원가입, 회원정보 수정시 파일경로 저장 목적으로 사용
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
    @PostMapping("mySelect/{no}")
    public Map<String, Object> mySelect(@RequestBody MemberVo vo, @PathVariable String no) throws Exception {
    	
    	// 회원정보 조회
    	MemberVo loginMember = service.mySelect(vo);
    	
    	// 응답 맵 생성
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("msg","good");
        map.put("loginMember", loginMember);
        System.out.println(loginMember);
        
        // 회원이 존재하지 않을 경우
        if( loginMember == null ) {
        	map.put("msg", "bad");
        }
        return map;  
    }
    
    
    //클라이언트로 이미지파일을 전달
    @GetMapping("display")
    public ResponseEntity display(String no) throws IOException {      
    	//파일경로=회원번호 를 이용하여, 디비에 있는 파일경로 가져오기
    	MemberVo vo = new MemberVo();
    	vo.setNo(no);
    	MemberVo dbVo = service.mySelect(vo);
    	String dbFullPath = dbVo.getFullPath();
//    	7 -> C:\dev\profileImg\lyj.png
        File f = new File(dbFullPath);
        Path filePath = f.toPath();
        byte[] data = Files.readAllBytes(filePath);
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/jpg"))
                .body(data)
                ;
    }
         
    //내 정보 수정하기 
    @PostMapping("edit")
    public Map<String,String> edit(MemberVo vo, MultipartFile profileImg) throws Exception {
    	
    	System.out.println("vo : " + vo);
    	System.out.println("profileImg : " + profileImg);
    	System.out.println("profileImg.getOriginalFilename : " + profileImg.getOriginalFilename());
    	
    	String fullPath = saveFile(profileImg);
		vo.setFullPath(fullPath);
		
        int result = service.edit(vo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}        
        return map;        
    }
    
    
    
    //메인화면- 로그인후 가입한 모임 조회하기        
    @PostMapping("selectMyClub")
    public Map<String, Object> selectMyClub(selectMyClubVo vo){
    	List<selectMyClubVo> voList = service.selectMyClub(vo);
    	Map<String, Object> map = new HashMap<String, Object>();
        map.put("msg","good");
        map.put("voList", voList);
        System.out.println("로그인: " + voList);
        
        if(voList == null ) {
        	map.put("msg", "bad");
        }
        return map;        
    	
////    	MemberVo memberVo = new MemberVo();
////    	voList.add(memberVo);
//    	System.out.println(voList);
    } 
       
}//class
