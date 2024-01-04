package com.yeogi.app.board.controller;

import com.yeogi.app.board.dto.BoardDetailDto;
import com.yeogi.app.board.dto.BoardDetailValidDto;
import com.yeogi.app.board.dto.BoardListDto;
import com.yeogi.app.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService service;

    /**
     * 게시글 리스트 출력
     * @param clubNo
     * @param pageNo
     * @return
     */
    @GetMapping("list/{clubNo}")
    public List<BoardListDto> getList(@PathVariable String clubNo, @RequestParam(defaultValue = "0") String pageNo) {

        return service.getBoardListByClubNo(clubNo, pageNo);
    }

    @GetMapping("/detail/{clubNo}/{boardNo}")
    public BoardDetailDto getOneByBoardNo(@PathVariable BoardDetailValidDto valid) {
        return service.getOneByBoardNo(valid);
    }
}
