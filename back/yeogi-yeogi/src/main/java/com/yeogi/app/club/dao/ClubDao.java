package com.yeogi.app.club.dao;

import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.dto.CreateClubDto;
import com.yeogi.app.club.vo.ClubVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import lombok.extern.slf4j.Slf4j;
import java.util.List;

@Repository
public class ClubDao {

    public List<ClubVo> getClubList(ClubSearchDto clubSearchDto, SqlSessionTemplate sst) {
        return sst.selectList("ClubMapper.searchClub", clubSearchDto);
    }

    public int createClub(CreateClubDto createClubDto, SqlSessionTemplate sst) {
        return sst.insert("ClubMapper.createClub", createClubDto);
    }

    public int insertClubImage(CreateClubDto createClubDto, SqlSessionTemplate sst) {
        return sst.insert("ClubMapper.insertClubImage", createClubDto);
    }
}
