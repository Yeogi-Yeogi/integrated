package com.yeogi.app.notice.controller;

import com.yeogi.app.board.dto.CheckIsMemberDto;
import com.yeogi.app.notice.dto.NoticeListDto;
import com.yeogi.app.notice.service.NoticeService;
import com.yeogi.app.util.exception.ErrorResult;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService service;



    @GetMapping("/list/{pageNo}")
    public ResponseEntity<List<NoticeListDto>> getNoticeList(@ModelAttribute CheckIsMemberDto checkDto, @PathVariable String pageNo) throws NotClubMemberException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return new ResponseEntity<>(service.getNoticeList(checkDto, pageNo), headers, HttpStatus.OK);
    }

    @ExceptionHandler(value = NotClubMemberException.class)
    public ResponseEntity<ErrorResult> handleErrorNotMember(NotClubMemberException e) {
        e.printStackTrace();
        ErrorResult response = new ErrorResult();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());

        return new ResponseEntity<>(response, null, HttpStatus.BAD_REQUEST);
    }
}
