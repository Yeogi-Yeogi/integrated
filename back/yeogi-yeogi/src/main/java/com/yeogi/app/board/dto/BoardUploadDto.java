package com.yeogi.app.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardUploadDto {
    private String clubNo;
    private String memberNo;
    private String boardNo;
    private String title;
    private String content;
    private List<MultipartFile> imageList;
    //지울 파일 번호
    private List<String> deleted;
}
