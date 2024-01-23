package com.yeogi.app.notice.controller;

import com.yeogi.app.notice.dto.ScheduleListDto;
import com.yeogi.app.notice.service.ScheduleService;
import com.yeogi.app.util.check.CheckDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;

@Slf4j
@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ScheduleController {

    private final ScheduleService service;


    @GetMapping("/list/{offset}")
    public ResponseEntity<ScheduleListDto> getList(CheckDto dto, String isExpected, @PathVariable int offset) throws RuntimeException {
        log.debug("dto = {}, isExpected = {}, offset = {}", dto, isExpected, offset);
        return new ResponseEntity<>(service.getListByClubNo(dto, isExpected, offset), getHttpHeaders(), HttpStatus.OK);
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return headers;
    }
}
