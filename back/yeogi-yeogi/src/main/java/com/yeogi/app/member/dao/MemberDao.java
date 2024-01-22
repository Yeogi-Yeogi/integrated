package com.yeogi.app.member.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.yeogi.app.member.vo.MemberVo;

@Repository
public class MemberDao {

	//회원가입
	public int join(SqlSessionTemplate sst, MemberVo vo) {
		return sst.insert("MemberMapper.join", vo);		
	}
	
	//아이디 중복 체크
	public MemberVo idCheck(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.idCheck", vo);
	}
	
	// 로그인
	public MemberVo login(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.login" , vo);
	}

	// 회원 탈퇴
	public int quit(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.quit", vo);
	}

	//내 정보 조회
	public MemberVo mySelect(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.mySelect",vo);
	}

	//내 정보 수정
	public int edit(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.edit" , vo);
	}

	//메인화면- 로그인후 가입한 모임 조회하기
	public List<MemberVo> selectMyClub(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectList("MemberMapper.selectMyClub", vo);
	}

}
