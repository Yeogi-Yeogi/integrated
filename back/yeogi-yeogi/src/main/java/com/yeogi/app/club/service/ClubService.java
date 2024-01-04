package com.yeogi.app.club.service;

import com.yeogi.app.club.dao.ClubDao;
import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.vo.ClubVo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubDao dao;
    private final SqlSessionTemplate sst;

    public List<ClubVo> getClubList(ClubSearchDto clubSearchDto) {
        return dao.getClubList(clubSearchDto, sst);
    }
}
