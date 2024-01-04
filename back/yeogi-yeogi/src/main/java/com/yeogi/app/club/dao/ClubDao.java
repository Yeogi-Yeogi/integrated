package com.yeogi.app.club.dao;

import com.yeogi.app.club.vo.ClubVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClubDao {

    public List<ClubVo> getClubList(String searchString, SqlSessionTemplate sst) {
        return sst.selectList("ClubMapper.searchClub", searchString);
    }
}
