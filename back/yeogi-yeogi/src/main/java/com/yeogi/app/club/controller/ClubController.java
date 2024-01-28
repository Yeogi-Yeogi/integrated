package com.yeogi.app.club.controller;

import com.yeogi.app.club.dto.*;
import com.yeogi.app.club.service.ClubService;
import com.yeogi.app.club.vo.ClubCategoryVo;
import com.yeogi.app.club.vo.ClubMemberVo;
import com.yeogi.app.club.vo.ClubVo;
import com.yeogi.app.util.check.CheckClubMember;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.exception.DeletedClubException;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("club")
@CrossOrigin("*")
public class ClubController {

    private final ClubService service;



    /**
     * 클럽 검색
     * @param clubSearchDto
     * @return
     */
    @GetMapping("searchClub/{searchText}")
    public List<ClubVo> searchClub(@PathVariable String searchText){
        log.info("searchText = {}", searchText);
//        log.info("clubSearchDto = {}", clubSearchDto);
        List<ClubVo> searchClubList = service.searchClub(searchText);
        log.info("clubList = {}", searchClubList);

        return searchClubList;
    }

    /**
     * 클럽 리스트 불러오기
     */
    @GetMapping("clubList")
    public List<ClubVo> getClubList(){
        return service.getClubList();
    }

    /**
     * 클럽 생성
     * @param createClubDto
     * @return
     */
    @PostMapping("createClub")
    public int createClub(@RequestBody MultipartFile file, CreateClubDto createClubDto) throws IOException {

        log.info("createClubDto = {}", createClubDto);
        log.info("file = {}", file);
        String type = "create";

        int seqNo = service.createClub(file, createClubDto, type);

        // 클럽이미지 선택x == 기본이미지
        // 클럽 insert 하고,,, 시퀀스,,,

        return seqNo;
    }

    /**
     * 클럽 생성 - 클럽명 중복 확인
     * @param clubName
     * @return
     */
    @PostMapping("checkClubName")
    public String checkClubName(@RequestBody String clubName){
        log.info("clubName = {}", clubName);
        // 중복되는 클럽명 있으면 어떻게 처리할지
        String getClubName =  service.checkClubName(clubName);
        if(getClubName == null){
            getClubName = "success";
        }
        return getClubName;
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
     * @param dto
     * @return
     */
    @PostMapping("joinClub")
    public int joinClub(@RequestBody JoinClubDto dto){
        log.info("dto = {}", dto);
        int result = service.joinClub(dto);

        return result;
    }

    /**
     * 클럽 관리 (클럽 관리 화면) -> 클럽 정보 + 가입유저 정보
     * @param clubNo
     * @return
     */
    @GetMapping("management/{clubNo}")
    public ClubVo clubManagement(@PathVariable String clubNo){
        return service.getClubInfo(clubNo);
    }

    /**
     * 클럽 회원 리스트 불러오기
     * @param clubNo 클럽번호
     * @return
     */
    @GetMapping("clubMemberList/{clubNo}")
    public List<ClubMemberVo> clubMemberList(@PathVariable String clubNo){
        List<ClubMemberVo> list = service.getClubMemberList(clubNo);
        log.info("list = {}", list);
        return list;
    }

    /**
     *  클럽 관리(클럽 정보 수정)
     *  대표이미지 변경, 소개글 변경, 모임인원 변경, 가입 연령 변경, 클럽삭제
     * @param editClubDto
     * @return
     */
    @PostMapping("editClub")
    public int editClub(@RequestBody MultipartFile file, EditClubDto editClubDto) throws IOException {

        log.info("EditClubDto = {}", editClubDto);
        log.info("file = {}", file);
        return service.editClub(editClubDto, file);
    }

    /**
     * 클럽 멤버 관리(관리자 지정,해제 및 회원 추방)
     * @param editClubMemberDto
     * @return
     */
    @PostMapping("editClubMember")
    public int editClubMember(@RequestBody EditClubMemberDto editClubMemberDto){
        log.info("EditClubMemberDto : {}", editClubMemberDto);
        return service.editClubMember(editClubMemberDto);
    }

    /**
     * 클럽 탈퇴하기
     * @param editClubMemberDto
     * @return
     */
    @PostMapping("quitClub")
    public int quitClub(@RequestBody EditClubMemberDto editClubMemberDto){
        log.info("editClubMemberDto : {}", editClubMemberDto);
        int result = service.quitClub(editClubMemberDto);

        return result;
    }


    /**
     * 클럽 삭제
     * @param clubNo
     * @return
     */
    @PostMapping("deleteClub")
    public int deleteClub(@RequestBody String clubNo){
        return service.deleteClub(clubNo);
    }

    /**
     * 클럽 회원정보 체크 ( creator, admin, .. )
     * @param checkDto
     * @return
     * @throws NotClubMemberException
     */
    @PostMapping("checkMember")
    public CheckDto checkMember(@RequestBody CheckDto checkDto) throws NotClubMemberException, DeletedClubException {
        return service.checkMember(checkDto);
    }

    /**
     * 카테고리명 불러오기 (클럽생성)
     * @return
     */
    @GetMapping("getCategoryName")
    public List<ClubCategoryVo> getCategoryName(){
        return service.getCategoryName();
    }

    @PostMapping("checkJoinedClub")
    public String checkJoinedClub(@RequestBody JoinClubDto dto){
        return service.checkJoinedClub(dto);
    }
}
