package com.yeogi.app.notice.controller;

import com.yeogi.app.board.dto.BoardDetailValidDto;
import com.yeogi.app.board.dto.CheckIsMemberDto;
import com.yeogi.app.notice.dto.NoticeDetailDto;
import com.yeogi.app.notice.dto.NoticeListDto;
import com.yeogi.app.notice.service.NoticeService;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.exception.ErrorResult;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NoticeController {

    private final NoticeService service;

    /**
     * 공지사항 리스트 가져오기
     * (15개씩 페이징 처리)
     * 전체 페이지 개수 가져오기
     * @param checkDto
     * @param pageNo
     * @return
     * @throws NotClubMemberException
     */
    @GetMapping("/list/{pageNo}")
    public ResponseEntity<Map<String,Object>> getNoticeList(CheckDto checkDto, @PathVariable String pageNo) throws NotClubMemberException {
        log.info("dto = {}", checkDto);
        HttpHeaders headers = getHttpHeaders();
        Map<String, Object> result = service.getNoticeList(checkDto, pageNo);
        return new ResponseEntity<>(result, headers, HttpStatus.OK);
    }

    /**
     * 공지사항 상세 조회
     * @param dto
     * @return
     * @throws NotClubMemberException
     */
    @GetMapping("/detail")
    public ResponseEntity<NoticeDetailDto> getDetail(@ModelAttribute BoardDetailValidDto dto) throws NotClubMemberException {
        return new ResponseEntity<>(service.getOne(dto), getHttpHeaders(), HttpStatus.OK);
    }


    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return headers;
    }

}
