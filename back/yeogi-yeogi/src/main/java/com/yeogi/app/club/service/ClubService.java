package com.yeogi.app.club.service;

import com.yeogi.app.club.dao.ClubDao;
import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.dto.CreateClubDto;
import com.yeogi.app.club.dto.EditClubDto;
import com.yeogi.app.club.dto.EditClubMemberDto;
import com.yeogi.app.club.vo.ClubVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ClubService {

    private final ClubDao dao;
    private final SqlSessionTemplate sst;

    public List<ClubVo> getClubList(ClubSearchDto clubSearchDto) {
        return dao.getClubList(clubSearchDto, sst);
    }

    @Transactional
    public int createClub(CreateClubDto createClubDto) {
        int result = dao.createClub(createClubDto, sst);

        if(result == 1){
            int clubImageResult = dao.insertClubImage(createClubDto, sst);
            log.info("clubImageResult = {}", clubImageResult);
        }

        return result;
    }

    public ClubVo getClubDescription(String clubNo) {
        return dao.getClubDescription(sst, clubNo);
    }

    public int joinClub(ClubVo vo) {
        return dao.joinClub(sst, vo);
    }

    public int editClub(EditClubDto editClubDto) {
        return  dao.editClub(sst, editClubDto);
    }

    public int editClubMember(EditClubMemberDto editClubMemberDto) {
        if(editClubMemberDto.getAdminYn() == null){
            return dao.editClubMember(sst, editClubMemberDto);
        } else {
            return dao.quitClubMember(sst, editClubMemberDto);
        }
    }
}
