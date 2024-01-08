package com.yeogi.app.club.controller;

import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.dto.CreateClubDto;
import com.yeogi.app.club.dto.EditClubDto;
import com.yeogi.app.club.dto.EditClubMemberDto;
import com.yeogi.app.club.service.ClubService;
import com.yeogi.app.club.vo.ClubMemberVo;
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

    /**
     * 클럽 검색
     * @param clubSearchDto
     * @return
     */
    @GetMapping("searchClub")
    public List<ClubVo> searchClub(ClubSearchDto clubSearchDto){
        log.info("clubSearchDto = {}", clubSearchDto);
        List<ClubVo> searchClubList = service.getClubList(clubSearchDto);
        log.info("clubList = {}", searchClubList);

        return searchClubList;
    }

    /**
     * 클럽 생성
     * @param createClubDto
     * @return
     */
    @PostMapping("createClub")
    public int createClub(CreateClubDto createClubDto){
        log.info("createClubDto = {}", createClubDto);
        int result = service.createClub(createClubDto);
        log.info("result = {}", result);
        // 클럽이미지 선택x == 기본이미지
        return result;
    }

    /**
     * 클럽 생성 - 클럽명 중복 확인 - 이미지파일관련 수정 필요
     * @param clubName
     * @return
     */
    @PostMapping("checkClubName")
    public String checkClubName(String clubName){
        // 중복되는 클럽명 있으면 어떻게 처리할지 써야됨
        return service.checkClubName(clubName);
    }

    /**
     * 클럽 소개(가입 전 클럽 보여주는 화면)
     * @param clubNo
     * @return
     */
    @GetMapping("clubDescription")
    public ClubVo clubDescription(String clubNo){
        return service.getClubDescription(clubNo);
    }

    /**
     * 클럽 가입
     * @param vo
     * @return
     */
    @PostMapping("joinClub")
    public int joinClub(ClubVo vo){
        // 회원 넘버 받아와서 처리할 dto 만들기,,
        int result = service.joinClub(vo);

        return result;
    }

    /**
     * 클럽 관리 (클럽 관리 화면) -> 클럽 정보 + 가입유저 정보
     * @param no
     * @return
     */
    @GetMapping("management")
    public ClubVo clubManagement(String no){
        return service.getClubInfo(no);
    }

    /**
     * 클럽 회원 리스트 불러오기
     * @param clubNo 클럽번호
     * @return
     */
    @GetMapping("clubMemberList")
    public List<ClubMemberVo> clubMemberList(String clubNo){
        return service.getClubMemberList(clubNo);
    }

    /**
     *  클럽 관리(클럽 정보 수정)
     *  대표이미지 변경, 소개글 변경, 모임인원 변경, 가입 연령 변경, 클럽삭제
     * @param editClubDto
     * @return
     */
    @PostMapping("editClub")
    public int editClub(EditClubDto editClubDto){

        return service.editClub(editClubDto);
    }

    /**
     * 클럽 멤버 관리(관리자 지정,해제 및 회원 추방)
     * @param editClubMemberDto
     * @return
     */
    @PostMapping("editClubMember")
    public int editClubMember(EditClubMemberDto editClubMemberDto){
        return service.editClubMember(editClubMemberDto);
    }

    /**
     * 클럽 탈퇴(회원) => 모임장은 안돼
     * @param editClubDto
     * @return
     */
    @PostMapping("quitClub")
    public int quitClub(EditClubDto editClubDto){

        int result = service.quitClub(editClubDto);

        return result;
    }
}
