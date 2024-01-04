package com.yeogi.app.club.controller;

import com.yeogi.app.club.service.ClubService;
import com.yeogi.app.club.vo.ClubVo;
import lombok.RequiredArgsConstructor;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@ResponseBody
@RequestMapping("club")
public class ClubController {

    private final ClubService service;

    // 클럽 검색
    @GetMapping("searchClub")
    public void searchClub(@RequestBody String searchString){
        List<ClubVo> clubList = service.getClubList(searchString);
        System.out.println(clubList);
    }

}
