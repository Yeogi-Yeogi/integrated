package com.yeogi.app.gallery.controller;

import com.yeogi.app.board.dto.BoardListFileUrlDto;
import com.yeogi.app.gallery.dto.GalleryListDto;
import com.yeogi.app.gallery.service.GalleryService;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.exception.NotClubMemberException;
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
@RequestMapping("/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService service;


    @GetMapping("/list/{pageNo}")
    public ResponseEntity<GalleryListDto> getList(@ModelAttribute CheckDto dto, @PathVariable String pageNo) throws NotClubMemberException {
        return new ResponseEntity<GalleryListDto>(service.getList(dto, pageNo), getHttpHeaders(), HttpStatus.OK);
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return headers;
    }
}
