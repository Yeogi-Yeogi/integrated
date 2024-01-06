package com.yeogi.app.club.controller;

import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.dto.CreateClubDto;
import com.yeogi.app.club.dto.EditClubDto;
import com.yeogi.app.club.dto.EditClubMemberDto;
import com.yeogi.app.club.service.ClubService;
import com.yeogi.app.club.vo.ClubVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@ResponseBody
@RequestMapping("club")
public class ClubController {

    private final ClubService service;

    // 클럽 검색
    @GetMapping("searchClub")
    public List<ClubVo> searchClub(ClubSearchDto clubSearchDto){
        log.info("clubSearchDto = {}", clubSearchDto);
        List<ClubVo> searchClubList = service.getClubList(clubSearchDto);
        log.info("clubList = {}", searchClubList);

        return searchClubList;
    }

    // 클럽 생성
    @PostMapping("createClub")
    public int createClub(CreateClubDto createClubDto){
        log.info("createClubDto = {}", createClubDto);
        int result = service.createClub(createClubDto);
        log.info("result = {}", result);
        // 클럽이미지 선택x == 기본이미지
        return result;
    }

    // 클럽 생성 - 클럽명 중복 확인
    @PostMapping("checkClubName")
    public String checkClubName(String clubName){
        // 중복되는 클럽명 있으면 어떻게 처리할지
        return service.checkClubName(clubName);
    }

    //클럽 소개(가입 전 클럽 보여주는 화면)
    @GetMapping("clubDescription")
    public ClubVo clubDescription(String clubNo){
        return service.getClubDescription(clubNo);
    }

    // 클럽 가입
    @PostMapping("joinClub")
    public int joinClub(ClubVo vo){
        // 회원 넘버 받아와서 처리할 dto 만들기,,
        int result = service.joinClub(vo);

        return result;
    }

    // 클럽 관리 (클럽 관리 화면) -> 클럽 정보 + 가입유저 정보
    @GetMapping("management")
    public ClubVo clubManagement(String no){
        return service.getClubInfo(no);
    }

    // 클럽 관리(클럽 정보 수정)
    @PostMapping("editClub")
    public int editClub(EditClubDto editClubDto){
        // 대표이미지 변경, 소개글 변경, 모임인원 변경, 가입 연령 변경,
        return service.editClub(editClubDto);
    }

    @PostMapping("editClubMember")
    public int editClubMember(EditClubMemberDto editClubMemberDto){
    //    클럽 관리(관리자 지정, 해제)
    //    클럽 관리(회원 추방)
        return service.editClubMember(editClubMemberDto);
    }
}
