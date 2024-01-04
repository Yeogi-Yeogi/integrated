package com.yeogi.app.club.controller;

import com.yeogi.app.club.dto.ClubSearchDto;
import com.yeogi.app.club.service.ClubService;
import com.yeogi.app.club.vo.ClubVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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

}
