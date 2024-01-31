package com.yeogi.app.member.service;

import java.util.List;

import javax.transaction.Transactional;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.yeogi.app.member.dao.MemberDao;
import com.yeogi.app.member.vo.MemberVo;
import com.yeogi.app.member.vo.selectMyClubVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
	
	private final MemberDao dao;
	private final SqlSessionTemplate sst;

	//회원가입
	public int join(MemberVo vo) {
		
        String str = vo.getFullPath().replace("C:\\dev\\profileImg\\", "C:\\dev\\profileImg\\");
		vo.setFullPath(str);
		
		return dao.join(sst, vo);
	}
	
	//아이디 중복 확인
	public MemberVo idCheck(MemberVo vo) {
		return dao.idCheck(sst, vo);
	}
	
	//비밀번호 일치 여부 확인
	public MemberVo pwdCoincide(MemberVo vo) {
		return dao.pwdCoincide(sst,vo);
	}
	
	// 로그인
	public MemberVo login(MemberVo vo) {
		return dao.login(sst, vo);
	}

	// 회원 탈퇴
	public int quit(MemberVo vo) {
	    
		return dao.quit(sst, vo);
		
	}
	
	//내 정보 조회-이름, 아이디, 비밀번호, 닉네임, 전화번호, 이메일, 가입일자, 수정일자, 프로필이미지, 주민등록번호//내 정보 수정(회원 정보 조회-이름, 아이디, 주민등록번호 조회)-필요없음
	public MemberVo mySelect(MemberVo vo) {
		return dao.mySelect(sst,vo);
	}
	
	//내 정보 수정(update)
	public int edit(MemberVo vo) {
		
		String str = vo.getFullPath().replace("C:\\dev\\profileImg\\", "C:\\dev\\profileImg\\");
		vo.setFullPath(str);
		
		return dao.edit(sst,vo);
	}
	
	//메인화면- 로그인후 가입한 모임 조회하기
	public List<selectMyClubVo> selectMyClub(selectMyClubVo vo) {
		return dao.selectMyClub(sst,vo);
	}


}
