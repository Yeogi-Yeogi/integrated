package com.yeogi.app.board.controller;

import com.yeogi.app.board.dto.*;
import com.yeogi.app.board.service.BoardService;
import com.yeogi.app.util.exception.ErrorResult;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService service;

    /**
     * 게시글 리스트 출력
     * @param dto
     * @param pageNo
     * @return
     */
    @GetMapping("/list/{pageNo}")
    public ResponseEntity<List<BoardListDto>> getList(@ModelAttribute CheckIsMemberDto dto, @PathVariable String pageNo) throws NotClubMemberException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return new ResponseEntity<>(service.getBoardListByClubNo(dto, pageNo), headers, HttpStatus.OK);
    }

    /**
     * 게시글 작성
     * @param dto
     * @return
     */
    @PostMapping("/add")
    public ResponseEntity<String> addBoard(@RequestBody BoardAddDto dto) {
        int result = service.addBoard(dto);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return new ResponseEntity<>("작성 완료", headers, HttpStatus.OK);
    }

    /**
     * 게시글 상세 조회
     * (로그인 멤버 가져오는 코드 필요)
     * @param valid
     * @return
     */
    @GetMapping("/detail")
    public ResponseEntity<BoardDetailDto> getOneByBoardNo(@ModelAttribute BoardDetailValidDto valid) throws NotClubMemberException {
        log.info("valid = {}", valid);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return new ResponseEntity<>(service.getOneByBoardNo(valid), headers, HttpStatus.OK);
    }

    /**
     * 게시글 상세조회 실패 시 오류
     * @param e
     * @return
     */
    @ExceptionHandler(value = NoResultException.class)
    public ResponseEntity<ErrorResult> handleErrorNoResult(NoResultException e) {
        e.printStackTrace();
        ErrorResult response = new ErrorResult();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());

        return new ResponseEntity<>(response, null, HttpStatus.BAD_REQUEST);
    }

    /**
     * 모임에 가입한 회원이 아닐 경우
     * @param e
     * @return
     */
    @ExceptionHandler(value = NotClubMemberException.class)
    public ResponseEntity<ErrorResult> handleErrorNotMember(NotClubMemberException e) {
        e.printStackTrace();
        ErrorResult response = new ErrorResult();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());

        return new ResponseEntity<>(response, null, HttpStatus.BAD_REQUEST);
    }


//    @ExceptionHandler(value = IOException.class)
//    public ResponseEntity<ErrorResult> handleIOE(IOException e) {
//        e.printStackTrace();
//        ErrorResult response = new ErrorResult();
//        response.setCode(HttpStatus.INTERNAL_SERVER_ERROR.ordinal());
//        response.setMessage(e.getMessage());
//
//        return new ResponseEntity<>(response, null, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}
