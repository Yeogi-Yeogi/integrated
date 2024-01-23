package com.yeogi.app.board.controller;

import com.yeogi.app.board.dto.*;
import com.yeogi.app.board.service.BoardService;
import com.yeogi.app.util.check.CheckDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BoardController {

    private final BoardService service;

    /**
     * 게시글 리스트 출력
     * @param dto
     * @param pageNo
     * @return
     */
    @GetMapping("/list/{pageNo}")
    public ResponseEntity<List<BoardListDto>> getList(@ModelAttribute CheckDto dto, @PathVariable String pageNo) throws RuntimeException {
        HttpHeaders headers = getHttpHeaders();
        log.info("check = {}", dto);
        return new ResponseEntity<>(service.getBoardListByClubNo(dto, pageNo), headers, HttpStatus.OK);
    }

    /**
     * 게시글 작성
     * @param dto
     * @return
     */
    @PostMapping("/add")
    public ResponseEntity<String> addBoard(BoardUploadDto dto) throws RuntimeException {
        log.info("boardUploadDto = {}", dto);
        int result = service.addBoard(dto); //import한 사진 개수 만큼

        HttpHeaders headers = getHttpHeaders();
        return new ResponseEntity<>("작성 완료", headers, HttpStatus.OK);
    }

    /**
     * 게시글 상세 조회
     * (로그인 멤버 가져오는 코드 필요)
     * @param valid
     * @return
     */
    @GetMapping("/detail")
    public ResponseEntity<BoardDetailDto> getOneByBoardNo(@ModelAttribute BoardDetailValidDto valid) throws RuntimeException {
        log.info("valid = {}", valid);
        HttpHeaders headers = getHttpHeaders();
        return new ResponseEntity<>(service.getOneByBoardNo(valid), headers, HttpStatus.OK);
    }

    /**
     * memberNo, clubNo, boardNo
     * 연동 완료 DB 작업만 히면 됨
     * @param dto
     * @return
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteBoard(@RequestBody BoardDetailValidDto dto) throws RuntimeException {
        log.info("deleteDto = {} ", dto);
        int result = service.deleteBoard(dto);

        if(result != 1) {
            throw new IllegalStateException("게시글 삭제에 실패했습니다.");
        }
        return new ResponseEntity<>("삭제 완료되었습니다.", getHttpHeaders(), HttpStatus.OK);
    }

    @PatchMapping("/update")
    public ResponseEntity<String> updateBoard(BoardUploadDto dto) throws RuntimeException {
        log.info("update = {}, 삭제하려는 사진 = {}, 추가하려는 사진 = {}", dto, dto.getDeleted(), dto.getImageList());
        int result = service.updateBoard(dto);

        if(result == 0) {
            throw new IllegalStateException("삭제 실패");
        }
        return new ResponseEntity<>("게시글을 수정하였습니다", getHttpHeaders(), HttpStatus.OK);
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return headers;
    }


}
