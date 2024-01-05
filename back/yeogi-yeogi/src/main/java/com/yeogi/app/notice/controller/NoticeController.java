package com.yeogi.app.notice.controller;

import com.yeogi.app.notice.dto.NoticeListDto;
import com.yeogi.app.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService service;


    @GetMapping("/list")
    public ResponseEntity<NoticeListDto> getNoticeList() {

    }
}
