package com.yeogi.app.member.service;

import javax.transaction.Transactional;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.yeogi.app.member.dao.MemberDao;
import com.yeogi.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
	
	private final MemberDao dao;
	private final SqlSessionTemplate sst;

	public int join(MemberVo vo) {
		
		return dao.join(sst, vo);
	}

}
