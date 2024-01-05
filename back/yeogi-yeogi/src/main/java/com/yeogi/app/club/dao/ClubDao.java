package com.yeogi.app.club.dao;

import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.dto.CreateClubDto;
import com.yeogi.app.club.vo.ClubVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
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

    public ClubVo getClubDescription(SqlSessionTemplate sst, String clubNo) {
        return sst.selectOne("ClubMapper.clubDescription", clubNo);
    }

    public int joinClub(SqlSessionTemplate sst, ClubVo vo) {
        return sst.insert("ClubMapper.joinClub", vo);
    }

    /**
     * 모임에 가입한 사람인지 체크하는 로직
     * @param dto
     * @param template
     * @return
     */
    public String checkIsClubMember(CheckIsMemberDto dto, SqlSessionTemplate template) {
        return template.selectOne("ClubMapper.checkIsClubMember", dto);
    }
}
