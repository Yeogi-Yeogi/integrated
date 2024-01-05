package com.yeogi.app.club.controller;

import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.dto.CreateClubDto;
import com.yeogi.app.club.dto.EditClubDto;
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
        List<ClubVo> clubList = service.getClubList(clubSearchDto);
        log.info("clubList = {}", clubList);

        return clubList;
    }

    // 클럽 생성
    @PostMapping("createClub")
    public int createClub(CreateClubDto createClubDto){
        log.info("createClubDto = {}", createClubDto);
        int result = service.createClub(createClubDto);
        log.info("result = {}", result);
        return result;
    }

    //클럽 소개
    @GetMapping("clubDescription")
    public ClubVo clubDescription(String clubNo){
        return service.getClubDescription(clubNo);
    }

    // 클럽 가입
    @PostMapping("joinClub")
    public int joinClub(ClubVo vo){

        int result = service.joinClub(vo);

        return result;
    }

    // 클럽 관리(클럽 정보 수정)
    @PostMapping("editClub")
    public int editClub(EditClubDto editClubDto){
        // 대표이미지 변경, 소개글 변경, 모임인원 변경, 가입 연령 변경,
        // 모임 회원관리 ( 관리자 지정, 추방? )
        return service.editClub(editClubDto);
    }

    //    클럽 관리(소개글변경)
    //    클럽 관리(대표이미지변경)
    //    클럽 관리(모임인원 변경)
    //    클럽 관리(가입연령 변경)
    //    클럽 관리(관리자 지정)
    //    클럽 관리(회원 추방)
}
