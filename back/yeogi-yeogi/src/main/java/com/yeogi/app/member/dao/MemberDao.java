package com.yeogi.app.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.yeogi.app.member.vo.MemberVo;

@Repository
public class MemberDao {

	//회원가입
	public int join(SqlSessionTemplate sst, MemberVo vo) {
		return sst.insert("MemberMapper.join", vo);		
	}

}
