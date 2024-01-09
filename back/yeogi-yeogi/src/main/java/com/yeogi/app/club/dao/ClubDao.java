package com.yeogi.app.club.dao;

import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.dto.CreateClubDto;
import com.yeogi.app.club.dto.EditClubDto;
import com.yeogi.app.club.dto.EditClubMemberDto;
import com.yeogi.app.club.vo.ClubMemberVo;
import com.yeogi.app.club.vo.ClubVo;
import com.yeogi.app.util.check.CheckDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Repository
public class ClubDao {

    /**
     * 모임에 가입한 사람인지 체크하는 로직
     * @param dto
     * @param template
     * @return
     */
    public CheckDto checkIsClubMember(CheckDto dto, SqlSessionTemplate template) {
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

    public String checkClubName(SqlSessionTemplate sst, String clubName) {
        return sst.selectOne("ClubMapper.checkClubName", clubName);
    }

    public ClubVo getClubInfo(SqlSessionTemplate sst, String no) {
        return sst.selectOne("ClubMapper.clubDescription", no);
    }

    public List<ClubMemberVo> getClubMemberList(SqlSessionTemplate sst, String clubNo) {
        return sst.selectList("ClubMapper.getClubMemberList", clubNo);
    }

    public int quitClub(SqlSessionTemplate sst, EditClubDto editClubDto) {
        return sst.delete("ClubMapper.quitClub", editClubDto);
    }

    public void insertClubMaster(CreateClubDto createClubDto, SqlSessionTemplate sst) {
    }

    public String uploadFile(MultipartFile file) {

        return "";
    }
}
