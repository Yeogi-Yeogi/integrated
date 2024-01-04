package com.yeogi.app.sample.controller;


import com.yeogi.app.sample.entity.UploadFile;
import com.yeogi.app.util.exception.ErrorResult;
import com.yeogi.app.sample.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class FileController {


    private final FileService fileService;


    /**
     * 서버에 올려놓고 보내줘야돼
     * @return
     */

    @PostMapping("/save")
    public String save(MultipartFile upload) throws IOException {
        log.info("upload.fileName = {}", upload.getOriginalFilename());
        fileService.save(upload);
        return "저장되었습니다.";
    }

    @GetMapping("/list")
    public List<UploadFile> getList() {
        return fileService.getList();
    }

    @DeleteMapping("/delete/{fileName}")
    public String delete(@PathVariable String fileName) {
        fileService.delete(fileName);
        return "삭제 되었습니다.";
    }


    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ErrorResult> joinExceptionHandler(NullPointerException e) {

        ErrorResult response = new ErrorResult();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage("오류류 발생");

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
