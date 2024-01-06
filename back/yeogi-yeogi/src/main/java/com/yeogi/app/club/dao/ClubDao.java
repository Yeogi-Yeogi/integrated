package com.yeogi.app.club.dao;

import com.yeogi.app.board.dto.CheckIsMemberDto;
import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.dto.CreateClubDto;
import com.yeogi.app.club.dto.EditClubDto;
import com.yeogi.app.club.dto.EditClubMemberDto;
import com.yeogi.app.club.vo.ClubVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ClubDao {

    /**
     * 모임에 가입한 사람인지 체크하는 로직
     * @param dto
     * @param template
     * @return
     */
    public String checkIsClubMember(CheckIsMemberDto dto, SqlSessionTemplate template) {
        return template.selectOne("ClubMapper.checkIsClubMember", dto);
    }


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

    public int editClub(SqlSessionTemplate sst, EditClubDto editClubDto) {
        return sst.update("ClubMapper.editClub", editClubDto);
    }


    public int editClubMember(SqlSessionTemplate sst, EditClubMemberDto editClubMemberDto) {
        return sst.update("ClubMapper.editClubMember", editClubMemberDto);
    }

    public int quitClubMember(SqlSessionTemplate sst, EditClubMemberDto editClubMemberDto) {
        return sst.delete("ClubMapper.quitClubMember", editClubMemberDto);
    }

    public String checkClubName(SqlSessionTemplate sst, String clubName) {
        return sst.selectOne("ClubMapper.checkClubName", clubName);
    }
}
