package com.yeogi.app.club.dao;

import com.yeogi.app.club.dto.*;
import com.yeogi.app.club.vo.CheckClubLimitVo;
import com.yeogi.app.club.vo.ClubCategoryVo;
import com.yeogi.app.club.vo.ClubMemberVo;
import com.yeogi.app.club.vo.ClubVo;
import com.yeogi.app.util.check.CheckDto;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
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

    public String isDeleted(String clubNo, SqlSessionTemplate template) {
        return template.selectOne("ClubMapper.isDeleted", clubNo);
    }

    public List<ClubVo> searchClub(ClubSearchDto clubSearchDto, SqlSessionTemplate sst) {
        return sst.selectList("ClubMapper.searchClub", clubSearchDto);
    }

    public int createClub(CreateClubDto createClubDto, SqlSessionTemplate sst) {
        return sst.insert("ClubMapper.createClub", createClubDto);
    }

//    public int insertClubImage(CreateClubDto createClubDto, SqlSessionTemplate sst) {
//        return sst.insert("ClubMapper.insertClubImage", createClubDto);
//    }

    public ClubVo getClubDescription(SqlSessionTemplate sst, String clubNo) {
        return sst.selectOne("ClubMapper.clubDescription", clubNo);
    }

    public int joinClub(SqlSessionTemplate sst, JoinClubDto dto) {
        return sst.insert("ClubMapper.joinClub", dto);
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

    public int quitClub(SqlSessionTemplate sst, EditClubMemberDto editClubMemberDto) {
        return sst.delete("ClubMapper.quitClub", editClubMemberDto);
    }

    public int insertClubMaster(CreateClubDto createClubDto, SqlSessionTemplate sst) {
        return sst.insert("ClubMapper.insertClubMaster", createClubDto);
    }

    public int uploadFile(ClubImageDto clubImageDto, SqlSessionTemplate sst) {
        log.info("dao clubImageDto = {}", clubImageDto);
        return sst.insert("ClubMapper.insertClubImage", clubImageDto);
    }

    public int updateFile(ClubImageDto clubImageDto, SqlSessionTemplate sst) {
        return sst.update("ClubMapper.updateFile", clubImageDto);
    }

    public String getClubImgName(String no, SqlSessionTemplate sst) {
        return sst.selectOne("ClubMapper.getClubImgName", no);
    }

    public int deleteClub(SqlSessionTemplate sst, String clubNo) {
        return sst.update("ClubMapper.deleteClub", clubNo);
    }
    public int deleteClubMember(SqlSessionTemplate sst, String clubNo) {
        return sst.delete("ClubMapper.deleteClubMember", clubNo);
    }

    public int getSeqNo(SqlSessionTemplate sst) {
        return sst.selectOne("ClubMapper.getClubSeqNo");
    }

    public List<ClubCategoryVo> getCategoryName(SqlSessionTemplate sst) {
        return sst.selectList("ClubMapper.getCategoryName");
    }

    public List<ClubVo> getClubList(SqlSessionTemplate sst) {
        return sst.selectList("ClubMapper.getClubList");
    }

    public CheckClubLimitVo checkLimit(SqlSessionTemplate sst, JoinClubDto dto) {
        return sst.selectOne("ClubMapper.checkLimit", dto);
    }

    public String checkJoinedClub(SqlSessionTemplate sst, JoinClubDto dto) {
        return sst.selectOne("ClubMapper.checkJoinedClub", dto);

    }
}
